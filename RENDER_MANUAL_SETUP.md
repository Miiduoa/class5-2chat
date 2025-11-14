# Render 手動設定指南（解決 uv 錯誤）

## 🔴 當前問題

1. **Start Command 錯誤**：Render 仍在使用 `uv run python...`，但系統沒有安裝 `uv`
2. **Python 版本錯誤**：使用 3.13.4 而不是 3.12.6

## ✅ 解決方案：在 Render 控制台手動設定

### 步驟 1：進入服務設定

1. 登入 [Render Dashboard](https://dashboard.render.com)
2. 點擊您的服務（chatapp）
3. 點擊「Settings」標籤

### 步驟 2：修改 Start Command

1. 找到「Build & Deploy」區塊
2. 找到「Start Command」欄位
3. **刪除舊的命令**：`uv run python ch6-3_chat_mongoDB_atlas/app.py`
4. **輸入新命令**：
   ```
   python ch6-3_chat_mongoDB_atlas/app.py
   ```
5. 點擊「Save Changes」

### 步驟 3：設定 Python 版本

1. 在「Environment Variables」區塊
2. 點擊「Add Environment Variable」
3. 輸入：
   - **Key**: `PYTHON_VERSION`
   - **Value**: `3.12.6`
4. 點擊「Add」
5. 如果已經存在，點擊編輯並修改為 `3.12.6`

### 步驟 4：確認 Build Command

1. 在「Build & Deploy」區塊
2. 確認「Build Command」為：
   ```
   pip install -r requirements.txt
   ```
3. 如果不是，請修改並保存

### 步驟 5：重新部署

1. 點擊「Manual Deploy」
2. 選擇「Deploy latest commit」
3. 等待部署完成

## 📋 完整設定檢查清單

- [ ] **Build Command**: `pip install -r requirements.txt`
- [ ] **Start Command**: `python ch6-3_chat_mongoDB_atlas/app.py`（**不是** `uv run...`）
- [ ] **Environment Variable**: `PYTHON_VERSION` = `3.12.6`
- [ ] 其他環境變數（從 .env 複製的）都已添加
- [ ] 已保存所有變更
- [ ] 已觸發重新部署

## 🎯 預期結果

部署成功後應該看到：
- ✅ 使用 Python 3.12.6
- ✅ 成功安裝 requirements.txt 中的套件
- ✅ 成功啟動應用程式（不會有 `uv: command not found` 錯誤）

