    ## CONNECT TO MONGODB PYTHON
import pymongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import mongodb_python_neo4j as neo4j
import relations as rel
import relationshipscore as relscore
from neo4j import GraphDatabase, RoutingControl

##################################################### MONGO
URIn = "neo4j+ssc://a4403cef.databases.neo4j.io"
AUTH = ("neo4j", "NuBLxLVxnXt7jUlC9sknOMCImY0JB1_uY-QJ4tf8fsI")
GraphDatabase.driver(URIn, auth=AUTH) 

#############################
uri = "mongodb+srv://applogin:wCl6QndJsayuLtOq@cluster0.ygx79sq.mongodb.net/?retryWrites=true&w=majority"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection
try:
    #Try the connection to the db. client.admin.command('ping')
    
    db = client["FamTree"]
    collection = db["profiles"]
    for coll in collection.find():   ## Davies remember to define the Primary key after Loop through the collection of rows returned from Mongo DB
        res = {key: coll[key] for key in coll.keys()  & {'firstName', 'lastName','middleName','email','phone','birthDate','userId','country','city','relations','gender'}}
        #print(str(res['firstName']))
        fname = res['firstName']
        lname = res['lastName']
         #res['relationships']
        ## Generate unique Key
        nodeName = str(res['lastName'])+str(res['birthDate'])+str(res['firstName'])+str(res['middleName'])
        
        ### Davies Get the relationship Marching Score 
        fCheck ='False'
        rCheck = 'True'
        name = neo4j.matchNodeNew(nodeName)
        #print(type(str(name)))
        if fCheck in str(name) :
            addNode = neo4j.addNode(nodeName)
            if rCheck in str(addNode):
                neo4j.addNodeProperty(nodeName,res['lastName'],res['firstName'],res['middleName'],res['email'],res['phone'],res['birthDate'],res['userId'],res['country'],res['city'],res['gender'])
                print(str(nodeName) + ' Node has been created')
                #Match this user with other Nodes by score of 10 (Same LastName)
                relscore.relationshipscore(nodeName,res['firstName'],res['lastName'],res['middleName'],res['email'],res['phone'],res['birthDate'],res['userId'])
                ##Build relationships for node . Each node. Davies write an updated version of this next line
                for x in res['relations']:
                    rel.buildRelationship(nodeName,res['gender'],x['userId'],x['relationshipType'])
            else:
                print('Node could not be created.')
        else:
            neo4j.addNodeProperty(nodeName,res['lastName'],res['firstName'],res['middleName'],res['email'],res['phone'],res['birthDate'],res['userId'],res['country'],res['city'],res['gender'])
            print(str(nodeName) + ' Already Exists')
            ##Build relationships for node
            for x in res['relations']:
                rel.buildRelationship(nodeName,res['gender'],x['userId'],x['relationshipType'])
                
        #neo4j.marchScore(res['firstName'],res['lastName'],res['middleName'],res['email'],res['phone'],res['birthDate']) 
         #### should this be updated yet nooooo  
except Exception as e:
    print(e)




