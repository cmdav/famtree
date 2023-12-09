    ## CONNECT TO MONGODB PYTHON
import pymongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import mongodb_python_neo4j as neo4j
import relations as rel
from neo4j import GraphDatabase, RoutingControl

## DOCUMENT ALL PENDING RELATIONSHIPS
##################################################### MONGO
URIn = "neo4j+ssc://a4403cef.databases.neo4j.io"
AUTH = ("neo4j", "NuBLxLVxnXt7jUlC9sknOMCImY0JB1_uY-QJ4tf8fsI")
GraphDatabase.driver(URIn, auth=AUTH) 

#############################
uri = "mongodb+srv://applogin:wCl6QndJsayuLtOq@cluster0.ygx79sq.mongodb.net/?retryWrites=true&w=majority"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

    
db = client["FamTree"]
collection = db["profiles"]
pendingCollection =db["pendingRelationships"]
### Davies Get the relationship ,Marching Score 
fCheck ='False'
rCheck = 'True'
def relationshipscore(name,firstname, lastName, middleName, email, phone, birthDate,pId):
    checkScore = neo4j.marchPerfectScore(firstname, lastName, middleName, email, phone)
    scoreResult = updateMongodbPendingCollection(checkScore,pId)
    return scoreResult

def updateMongodbPendingCollection(result,pId):
    
    for results in result:
        sId=results[0]
        rel_exists = collection.count_documents({'userId':pId, 'relations.userId':sId});
        newvalues = {"userId_node1":pId, "userId_node2":sId,"relationshipType":"lastName"}
        if rel_exists < 1:
            status= pendingCollection.insert_one(newvalues)
            print(status)
            
        else:
            print("No value for document")
# relationshipscore('sameline-234044mncmnmf','Salim', 'Sema', 'Abdulanam', 'salim.sema@gmail.com', '2898902608', '1989-08-26','bbaf8af9-8238-4e7e-9bd3-9dd74cdcca41')
