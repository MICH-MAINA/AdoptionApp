
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

# get one item
@app.route('/dashboard/item/<int:home_id>')
def getOneHome(home_id):
    
    cursor = mydb.cursor()

    cursor.execute("SELECT homeName, homePhoneNo, homeAddress, homeNoOfChildren, homeNoOfFemales, homeNoOfMales, homeAvgAge FROM homedetails where idhomedetails = %s", (home_id,))
    response = jsonify(message= "server is running")
    response.headers.add("Access-Control-Allow-Origin", "*")
    result = cursor.fetchall()

    if result is None:
        return jsonify({'error': 'item not found'}), 404
    # cursor.close()
    # mydb.close()
    
    return jsonify([{"homeName": item[0], "homePhoneNo": item[1], "homeAddress":item[2], "homeNoOfChildren":item[3], "homeNoOfFemales": item[4], "homeNoOfMales": item[5], "homeAvgAge":item[6] } for item in result])

@app.route('/dashboard/search')
def get_data():
    query = request.args.get('q')
    cursor = mydb.cursor()

    cursor.execute("SELECT homename, homePhoneNo, homeNoOfChildren, homeNoOfFemales, homeNoOfMales, homeAvgAge, idhomedetails FROM homedetails WHERE homeAddress LIKE %s",  ('%' + query + '%',) )
    response = jsonify(message= "server is running")
    response.headers.add("Access-Control-Allow-Origin", "*")
    rows = cursor.fetchall()
    
    

    return jsonify([{"homeName": item[0], "homePhoneNo": item[1],"homeNoOfChildren":item[2], "homeNoOfFemales": item[3], "homeNoOfMales": item[4], "homeAvgAge":item[5], "idhomedetails":item[6]} for item in rows ])

@app.route("/login", methods = ['POST'])
def login():
    userPassword = request.json['userPassword']
    userEmail = request.json['userEmail']
    cursor = mydb.cursor()
    
    user = [userEmail, userPassword]

    cursor.execute("SELECT parentEmail, parentPassword FROM parentProfile WHERE parentEmail = %s AND parentPassword = %s", (userEmail, userPassword))
    response = jsonify(message= "server is running")
    response.headers.add("Access-Control-Allow-Origin", "*")

    result = cursor.fetchall()
    if len(result) > 0:
        return jsonify({"status": "sucess"})
    else:
        return jsonify({"message": "No user found", "userCombination": user}),404
    

    

if __name__ == '__main__':
    app.run(debug=True)

