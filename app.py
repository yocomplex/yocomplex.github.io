from flask import Flask, render_template, request, jsonify
from flask_mail import Mail, Message
import os

app = Flask(__name__)

# Configuration for Flask-Mail using Gmail's SMTP server
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = os.environ.get('jzam0310@gmail.com')  # Your Gmail address
app.config['MAIL_PASSWORD'] = os.environ.get('Jem125m51&')  # Your Gmail password
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('jzam0310@gmail.com')  # Your Gmail address

mail = Mail(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/projects')
def projects():
    projects = [
        {
            'name': 'Solar Paver Energy Monitoring App',
            'description': 'A real-time energy monitoring application developed to track the energy production of solar pavers.',
            'technologies': 'Python, Flask, HTML, CSS, JavaScript, Bootstrap',
            'link': 'https://github.com/yocomplex/solar_paver_monitor',
            'image': 'project1.jpg'
        },
        {
            'name': 'Mario Kart Simulation',
            'description': 'A sophisticated Mario Kart race simulation using C++ for performance analysis.',
            'technologies': 'C++, Data Structures, Algorithms',
            'link': 'https://github.com/yocomplex/marioKartSimulation',
            'image': 'project2.png'
        },
        {
            'name': 'Scanner and Parser',
            'description': 'A scanner and parser for an esoteric programming language.',
            'technologies': 'C++, Compilers, OOP',
            'link': 'https://github.com/yocomplex/scannerAndParser',
            'image': 'project3.png'
        }
    ]
    return render_template('projects.html', projects=projects)

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/submit_contact', methods=['POST'])
def submit_contact():
    data = request.form
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    # Send email
    msg = Message('Contact Form Submission',
                  recipients=[os.environ.get('jzam0310@gmail.com')])  # Replace with your Gmail address
    msg.body = f'Name: {name}\nEmail: {email}\nMessage: {message}'
    mail.send(msg)

    return jsonify(status='success', message='Thank you for your message!')

if __name__ == '__main__':
    app.run(debug=True)
