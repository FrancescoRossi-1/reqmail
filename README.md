# 📧 ReqMail - Email Template Manager

**ReqMail** è un'applicazione Flask per la gestione di template email con segnaposto personalizzabili. Permette di salvare, modificare e riutilizzare email predefinite in modo rapido ed efficiente.

## 🚀 Setup e Installazione

### **1️⃣ Clona la repository**
```sh
git clone https://github.com/tuo-username/reqmail.git
cd reqmail
```

### **2️⃣ Configura l'ambiente virtuale**

#### 🔹 **Windows**
```sh
python -m venv venv
venv\Scripts\activate
```

#### 🔹 **Mac/Linux**
```sh
python3 -m venv venv
source venv/bin/activate
```

### **3️⃣ Installa le dipendenze**
```sh
pip install -r requirements.txt
```

### **4️⃣ Configura il database**
Il database SQLite viene creato automaticamente, ma se non esiste, esegui:
```sh
python
>>> from app import db
>>> db.create_all()
>>> exit()
```

### **5️⃣ Avvia l'applicazione**
```sh
python app.py
```
Ora l'app sarà disponibile su **http://127.0.0.1:5000/**

## 🔧 Utilizzo del file `reqmail.bat`
Il file `reqmail.bat` consente di avviare rapidamente l'app su **Windows**. **Prima di usarlo, modificalo** inserendo il percorso corretto della cartella in cui hai clonato il progetto:
```bat
@echo off
cd /d "C:\il-tuo-percorso\reqmail"
python app.py
pause
```
Poi avvialo con doppio clic.


💡 **Contributi e suggerimenti sono benvenuti!** 🚀
