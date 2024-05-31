from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

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
            'link': 'https://github.com/yocomplex/solar_paver_monitor'
        },
        {
            'name': 'Mario Kart Simulation',
            'description': 'A sophisticated Mario Kart race simulation using C++ for performance analysis.',
            'technologies': 'C++, Data Structures, Algorithms',
            'link': 'https://github.com/yocomplex/marioKartSimulation'
        },
        {
            'name': 'Scanner and Parser',
            'description': 'A scanner and parser for an esoteric programming language.',
            'technologies': 'C++, Compilers, OOP',
            'link': 'https://github.com/yocomplex/scannerAndParser'
        }
    ]
    return render_template('projects.html', projects=projects)

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/submit_contact', methods=['POST'])
def submit_contact():
    data = request.form
    print(f"Received contact form submission: {data}")
    # Here you would typically handle the form data, such as sending an email
    return jsonify(status='success', message='Thank you for your message!')

if __name__ == '__main__':
    app.run(debug=False)
