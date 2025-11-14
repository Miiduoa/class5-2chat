import os
from flask import Flask, render_template
from flask_socketio import SocketIO, emit, join_room, leave_room
from pymongo import MongoClient
from datetime import datetime
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
# 嘗試使用 eventlet，如果失敗則使用 threading
try:
    import eventlet
    socketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet')
    print('✅ 使用 eventlet 模式')
except ImportError:
    socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading')
    print('⚠️ eventlet 未安裝，使用 threading 模式')

# MongoDB 連接
MONGO_URI = os.environ.get('MONGO_URI', '')
if MONGO_URI:
    try:
        client = MongoClient(MONGO_URI)
        db = client['chatapp']
        messages_collection = db['messages']
        print('✅ 已連接到 MongoDB Atlas')
    except Exception as e:
        print(f'❌ MongoDB 連接失敗: {e}')
        messages_collection = None
else:
    print('⚠️ 未設定 MONGO_URI，聊天記錄將不會保存')
    messages_collection = None

# 儲存所有連線的使用者
users = {}

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def handle_connect():
    print('用戶已連線')
    emit('connected', {'message': '已連線到聊天室'})

@socketio.on('disconnect')
def handle_disconnect():
    print('用戶已斷線')
    if hasattr(handle_disconnect, 'username'):
        username = handle_disconnect.username
        if username in users:
            del users[username]
            socketio.emit('user_left', {
                'username': username, 
                'message': f'{username} 離開了聊天室',
                'users': list(users.keys())
            }, broadcast=True)

@socketio.on('join')
def handle_join(data):
    print(f'📥 收到 join 事件: {data}')
    username = data.get('username', 'Anonymous')
    print(f'👤 使用者名稱: {username}')
    
    handle_disconnect.username = username  # 儲存使用者名稱
    users[username] = True
    join_room('chatroom')
    print(f'✅ 使用者 {username} 已加入房間')
    
    # 載入歷史訊息
    if messages_collection:
        try:
            # 載入最近 50 條訊息
            recent_messages = messages_collection.find().sort('timestamp', -1).limit(50)
            history = []
            for msg in reversed(list(recent_messages)):
                history.append({
                    'username': msg.get('username', 'Unknown'),
                    'message': msg.get('message', ''),
                    'timestamp': msg.get('timestamp', '')
                })
            print(f'📜 載入 {len(history)} 條歷史訊息')
            emit('history', {'messages': history})
        except Exception as e:
            print(f'❌ 載入歷史訊息失敗: {e}')
    
    response_data = {
        'username': username,
        'message': f'{username} 加入了聊天室',
        'users': list(users.keys())
    }
    print(f'📤 發送 joined 事件: {response_data}')
    emit('joined', response_data, broadcast=True, include_self=True)
    print(f'✅ {username} 加入了聊天室')

@socketio.on('message')
def handle_message(data):
    username = data.get('username', 'Anonymous')
    message = data.get('message', '')
    timestamp = data.get('timestamp', '')
    
    # 保存到 MongoDB
    if messages_collection:
        try:
            messages_collection.insert_one({
                'username': username,
                'message': message,
                'timestamp': timestamp,
                'created_at': datetime.now()
            })
        except Exception as e:
            print(f'保存訊息失敗: {e}')
    
    # 廣播訊息
    emit('message', {
        'username': username,
        'message': message,
        'timestamp': timestamp
    }, broadcast=True, include_self=False, room='chatroom')
    print(f'{username}: {message}')

@socketio.on('typing')
def handle_typing(data):
    username = data.get('username', 'Anonymous')
    is_typing = data.get('typing', False)
    
    emit('typing', {
        'username': username,
        'typing': is_typing
    }, broadcast=True, include_self=False, room='chatroom')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    socketio.run(app, host='0.0.0.0', port=port, debug=False, allow_unsafe_werkzeug=True)
