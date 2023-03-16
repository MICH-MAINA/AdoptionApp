
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

    insert_statement = "INSERT INTO parentreg (emailReg, passwordReg) VALUES (%s, %s)"
    values = (data['userEmail'], data['userPassword'])
    cursor.execute(insert_statement, values)

    mydb.commit()
    cursor.close()
    mydb.close()

    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run(debug=True)