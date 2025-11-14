const socket = io();

let username = '';
let isConnected = false;

// DOM 元素
const usernameModal = document.getElementById('username-modal');
const usernameInput = document.getElementById('username-input');
const joinBtn = document.getElementById('join-btn');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const messagesDiv = document.getElementById('messages');
const usersListDiv = document.getElementById('users-list');
const statusDiv = document.getElementById('status');
const typingIndicator = document.getElementById('typing-indicator');

let typingTimeout;

// Socket 事件監聽
socket.on('connect', () => {
    console.log('✅ 已連線到伺服器');
    statusDiv.textContent = '已連線';
    statusDiv.classList.add('connected');
    statusDiv.classList.remove('disconnected');
});

socket.on('disconnect', () => {
    console.log('❌ 已斷線');
    statusDiv.textContent = '已斷線';
    statusDiv.classList.remove('connected');
    statusDiv.classList.add('disconnected');
    isConnected = false;
    messageInput.disabled = true;
    sendBtn.disabled = true;
});

socket.on('connect_error', (error) => {
    console.error('❌ 連接錯誤:', error);
    statusDiv.textContent = '連接失敗';
    statusDiv.classList.remove('connected');
    statusDiv.classList.add('disconnected');
});

socket.on('connected', (data) => {
    console.log('📨 收到連接確認:', data.message);
});

socket.on('history', (data) => {
    // 載入歷史訊息
    if (data.messages && data.messages.length > 0) {
        data.messages.forEach(msg => {
            addMessage(msg.username, msg.message, msg.timestamp, false);
        });
    }
});

socket.on('joined', (data) => {
    console.log('✅ 成功加入聊天室:', data);
    username = data.username;
    isConnected = true;
    usernameModal.classList.add('hidden');
    messageInput.disabled = false;
    sendBtn.disabled = false;
    messageInput.focus();
    
    addSystemMessage(data.message);
    updateUsersList(data.users);
    
    // 恢復按鈕狀態
    joinBtn.disabled = false;
    joinBtn.textContent = '加入聊天室';
});

socket.on('user_left', (data) => {
    addSystemMessage(data.message);
    updateUsersList(data.users);
});

socket.on('message', (data) => {
    addMessage(data.username, data.message, data.timestamp, false);
});

socket.on('typing', (data) => {
    if (data.username !== username) {
        if (data.typing) {
            typingIndicator.textContent = `${data.username} 正在輸入...`;
        } else {
            typingIndicator.textContent = '';
        }
    }
});

// 加入聊天室
joinBtn.addEventListener('click', () => {
    const name = usernameInput.value.trim();
    console.log('🔘 點擊加入按鈕，使用者名稱:', name);
    console.log('🔌 Socket 連接狀態:', socket.connected);
    
    if (!name) {
        alert('請輸入您的名稱！');
        return;
    }
    
    if (!socket.connected) {
        alert('尚未連接到伺服器，請稍候再試...');
        console.error('Socket 未連接');
        return;
    }
    
    console.log('📤 發送 join 事件:', { username: name });
    socket.emit('join', { username: name });
    
    // 顯示載入狀態
    joinBtn.disabled = true;
    joinBtn.textContent = '加入中...';
});

usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        joinBtn.click();
    }
});

// 傳送訊息
sendBtn.addEventListener('click', () => {
    sendMessage();
});

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// 輸入中提示
messageInput.addEventListener('input', () => {
    if (isConnected && messageInput.value.trim()) {
        socket.emit('typing', { username: username, typing: true });
        
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            socket.emit('typing', { username: username, typing: false });
        }, 1000);
    }
});

// 傳送訊息函數
function sendMessage() {
    const message = messageInput.value.trim();
    if (message && isConnected) {
        const timestamp = new Date().toLocaleTimeString('zh-TW', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        socket.emit('message', {
            username: username,
            message: message,
            timestamp: timestamp
        });
        
        addMessage(username, message, timestamp, true);
        messageInput.value = '';
        
        socket.emit('typing', { username: username, typing: false });
    }
}

// 新增訊息到畫面
function addMessage(username, message, timestamp, isOwn) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isOwn ? 'own' : ''}`;
    
    const headerDiv = document.createElement('div');
    headerDiv.className = 'message-header';
    
    const usernameSpan = document.createElement('span');
    usernameSpan.className = 'message-username';
    usernameSpan.textContent = username;
    
    const timeSpan = document.createElement('span');
    timeSpan.className = 'message-time';
    timeSpan.textContent = timestamp;
    
    headerDiv.appendChild(usernameSpan);
    headerDiv.appendChild(timeSpan);
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = message;
    
    messageDiv.appendChild(headerDiv);
    messageDiv.appendChild(contentDiv);
    
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// 新增系統訊息
function addSystemMessage(message) {
    const systemDiv = document.createElement('div');
    systemDiv.className = 'system-message';
    systemDiv.textContent = message;
    messagesDiv.appendChild(systemDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// 更新使用者列表
function updateUsersList(users) {
    usersListDiv.innerHTML = '';
    if (users.length === 0) {
        usersListDiv.innerHTML = '<div class="user-item">目前沒有使用者</div>';
    } else {
        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.className = 'user-item';
            userDiv.textContent = user === username ? `${user} (你)` : user;
            usersListDiv.appendChild(userDiv);
        });
    }
}

// 初始化：聚焦到使用者名稱輸入框
usernameInput.focus();

