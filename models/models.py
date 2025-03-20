from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class EmailTemplate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    subject = db.Column(db.String(200), nullable=False)
    body = db.Column(db.Text, nullable=False)
    placeholders = db.Column(db.String(500), nullable=False)  # Es. "[NOME],[DATA]"

    def __repr__(self):
        return f'<EmailTemplate {self.name}>'
