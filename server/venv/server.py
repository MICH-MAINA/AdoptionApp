
from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)


mydb = mysql.connector.connect(
    host= "localhost",
    user= "root",
    password="root",
    database= "adoptionapp"
)


@app.route('/signup', methods = ['POST'])
def signup():
    data = request.json

    cursor = mydb.cursor()

    insert_statement = "INSERT INTO parentprofile ( parentFirstName, parentLastName, parentPhone, parentGender, parentEmail, parentPassword) VALUES (%s, %s, %s, %s, %s, %s)"
    values = (data['userFname'],data['userLname'],data['userPhoneNo'], data['userGender'],data['userEmail'], data['userPassword'])
    cursor.execute(insert_statement, values)

    mydb.commit()
    cursor.close()
    mydb.close()

    return jsonify({'status': 'success'})

@app.route('/dashboard', methods=['GET'])
def get_data():
    query = request.args.get('q')
    cursor = mydb.cursor()

    cursor.execute("SELECT * FROM homedetails")
    response = jsonify(message= "server is running")
    response.headers.add("Access-Control-Allow-Origin", "*")
    rows = cursor.fetchall()
    cursor.close()
    mydb.close()
    data = []

    for row in rows:
        data.append({
            'idhomedetails': row[0],
            'homeName' :row[1]
        })

    if query:
        data = [item for item in data if query.lower() in item['homeName'].lower()]
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)

