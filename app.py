from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

@app.route('/')
def home():
    projects = [
        {
            'name': 'Solar Paver Energy Monitoring App',
            'description': 'A real-time energy monitoring application developed to track the energy production of solar pavers.',
            'technologies': 'Python, Flask, HTML, CSS, JavaScript, Bootstrap',
            'link': 'https://github.com/yocomplex/solar_paver_monitor',
            'image': 'project3.png'
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
            'technologies': 'C++, Compilers, Object Oriented Programming',
            'link': 'https://github.com/yocomplex/scannerAndParser',
            'image': 'project1.jpg'
        }
    ]
    return render_template('index.html', projects=projects)

@app.route('/submit_contact', methods=['POST'])
def submit_contact():
    data = request.form
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    # Save the message to a file
    with open('messages.txt', 'a') as f:
        f.write(f'Name: {name}\nEmail: {email}\nMessage: {message}\n{"-"*20}\n')

    return jsonify(status='success', message='Thank you for your message!')

@app.route('/view_messages')
def view_messages():
    if not os.path.exists('messages.txt'):
        return '<pre>(no messages yet)</pre>'
    with open('messages.txt', 'r') as f:
        return f'<pre>{f.read()}</pre>'

if __name__ == '__main__':
    app.run(debug=True)
