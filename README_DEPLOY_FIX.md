# Render 部署問題修正

## 問題分析

1. **找不到 requirements.txt**：Render 預設在根目錄尋找 `requirements.txt`
2. **Python 版本錯誤**：使用了 3.13.4 而不是 3.12.6
3. **Build Command 問題**：Render 可能沒有正確讀取 `render.yaml` 的配置

## 已修正的內容

### 1. 創建根目錄 requirements.txt
已在根目錄創建 `requirements.txt`，包含：
- Flask==3.0.0
- gunicorn==21.2.0
- pymongo==4.6.1

### 2. 更新 render.yaml
- 將 `buildCommand` 改為 `pip install -r requirements.txt`（標準方式）
- 將 `startCommand` 改為 `python ch6-3_chat_mongoDB_atlas/app.py`（不使用 uv）

### 3. Python 版本設定
- `runtime.txt` 已設定為 `python-3.12.6`
- `render.yaml` 中也有 `PYTHON_VERSION=3.12.6`

## 如果 Render 仍無法讀取 render.yaml

如果 Render 仍然無法自動讀取 `render.yaml`，請手動設定：

### 在 Render 控制台手動設定：

1. **Build Command**：
   ```
   pip install -r requirements.txt
   ```

2. **Start Command**：
   ```
   python ch6-3_chat_mongoDB_atlas/app.py
   ```

3. **Environment Variables**：
   - `PYTHON_VERSION` = `3.12.6`
   - 其他從 `.env` 複製的變數

4. **Python Version**：
   - 在 Environment Variables 中添加 `PYTHON_VERSION=3.12.6`
   - 或確保 `runtime.txt` 存在且內容為 `python-3.12.6`

## 部署步驟

1. 推送更新到 GitHub
2. Render 會自動重新部署
3. 如果仍有問題，在 Render 控制台手動設定上述參數

