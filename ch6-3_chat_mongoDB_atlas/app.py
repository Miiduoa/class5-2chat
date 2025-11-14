import os
from flask import Flask

app = Flask(__name__)

# A basic "Hello World" to confirm the app is running.
# The full chat functionality can be added next.
@app.route('/')
def index():
    return "Chat App is running!"

if __name__ == '__main__':
    # Render provides the PORT environment variable.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
