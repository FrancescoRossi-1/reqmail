from flask import Flask, render_template, request, redirect, url_for
from models.models import db, EmailTemplate

app = Flask(__name__)

# Configurazione SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///reqmail.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Creiamo il database
with app.app_context():
    db.create_all()


@app.route('/')
def index():
    templates = EmailTemplate.query.all()

    # Convertiamo gli oggetti in un dizionario serializzabile
    templates_data = [
        {
            "id": template.id,
            "name": template.name,
            "subject": template.subject,
            "body": template.body,
            "placeholders": template.placeholders
        }
        for template in templates
    ]

    return render_template('index.html', templates=templates_data)

@app.route('/add', methods=['POST'])
def add_template():
    name = request.form['name']
    subject = request.form['subject']
    body = request.form['body']
    placeholders = ",".join([p.strip() for p in request.form['placeholders'].split(",")])

    new_template = EmailTemplate(name=name, subject=subject, body=body, placeholders=placeholders)
    db.session.add(new_template)
    db.session.commit()

    return redirect(url_for('index'))

@app.route('/delete/<int:template_id>', methods=['POST'])
def delete_template(template_id):
    template = EmailTemplate.query.get(template_id)
    if template:
        db.session.delete(template)
        db.session.commit()
    return redirect(url_for('index'))

@app.route('/edit/<int:template_id>', methods=['POST'])
def edit_template(template_id):
    template = EmailTemplate.query.get(template_id)
    if template:
        template.name = request.form['name']
        template.subject = request.form['subject']
        template.body = request.form['body']
        template.placeholders = ",".join([p.strip() for p in request.form['placeholders'].split(",")])
        db.session.commit()
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run(debug=True)
