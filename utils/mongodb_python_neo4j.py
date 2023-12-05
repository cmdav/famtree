from neo4j import GraphDatabase, RoutingControl

URI = "neo4j+ssc://a4403cef.databases.neo4j.io"
AUTH = ("neo4j", "NuBLxLVxnXt7jUlC9sknOMCImY0JB1_uY-QJ4tf8fsI")
driver=GraphDatabase.driver(URI, auth=AUTH)


def add_friend(driver, name, friend_name):
    driver.execute_query(
        "MERGE (a:Person {name: $name}) "
        "MERGE (friend:Person {name: $friend_name}) "
        "MERGE (a)-[:KNOWS]->(friend)",
        name=name, friend_name=friend_name, database_="neo4j",
    )

def print_friends(driver, name):
    records, _, _ = driver.execute_query(
        "MATCH (a:Person)-[:KNOWS]->(friend) WHERE a.name = $name "
        "RETURN friend.name ORDER BY friend.name",
        name=name, database_="neo4j", routing_=RoutingControl.READ,
    )
    for record in records:
        print(record["friend.name"])

def print_father(driver, name):
    records, _, _ = driver.execute_query(
        "MATCH (a:Person)-[:FATHER_OF]->(child) WHERE a.name = $name "
        "RETURN child.name ORDER BY child.name",
        name=name, database_="neo4j", routing_=RoutingControl.READ,
    )
    for record in records:
        print(record["child.name"])

def add_father(driver, name, child_name):
    driver.execute_query(
        "MERGE (a:Person {name: $name}) "
        "MERGE (child:Person {name: $child_name}) "
        "MERGE (a)-[:FATHER_OF]->(child)",
        name=name, child_name=child_name, database_="neo4j",
    )
## Add a sister relationship
def addSisRelationship(name, relative_name):
    driver.execute_query(
        "MERGE (a:Person {name: $name}) "
        "MERGE (child:Person {name: $relative_name}) "
        "MERGE (child)-[: SISTER_OF]->(a)",
        name=name, relative_name=relative_name, database_="neo4j",
    )
## Add a Brother relationship
def addBroRelationship(name, relative_name):
    driver.execute_query(
        "MERGE (a:Person {name: $name}) "
        "MERGE (child:Person {name: $relative_name}) "
        "MERGE (child)-[: BROTHER_OF]->(a)",
        name=name, relative_name=relative_name, database_="neo4j",
    )
## Add a Daughter relationship
def addDaughterRelationship(name, relative_name):
    driver.execute_query(
        "MERGE (a:Person {name: $name}) "
        "MERGE (child:Person {name: $relative_name}) "
        "MERGE (child)-[: DAUGHTER_OF]->(a)",
        name=name, relative_name=relative_name, database_="neo4j",
    )

## Add a Son relationship
def addSonRelationship(name, relative_name):
    driver.execute_query(
        "MERGE (a:Person {name: $name}) "
        "MERGE (child:Person {name: $relative_name}) "
        "MERGE (child)-[: SON_OF]->(a)",
        name=name, relative_name=relative_name, database_="neo4j",
    )

## Add a Father relationship
def addFatherRelationship(name, relative_name):
    driver.execute_query(
        "MERGE (a:Person {name: $name}) "
        "MERGE (child:Person {name: $relative_name}) "
        "MERGE (child)-[: FATHER_OF]->(a)",
        name=name, relative_name=relative_name, database_="neo4j",
    )
## Add a Mother relationship
def addMotherRelationship(name, relative_name):
    driver.execute_query(
        "MERGE (a:Person {name: $name}) "
        "MERGE (child:Person {name: $relative_name}) "
        "MERGE (child)-[: MOTHER_OF]->(a)",
        name=name, relative_name=relative_name, database_="neo4j",
    )
## Add a Wife relationship
def addWifeRelationship(name, relative_name):
    driver.execute_query(
        "MERGE (a:Person {name: $name}) "
        "MERGE (child:Person {name: $relative_name}) "
        "MERGE (child)-[: WIFE_OF]->(a)",
        name=name, relative_name=relative_name, database_="neo4j",
    )

## Add a Husband relationship
def addHusbandRelationship(name, relative_name):
    driver.execute_query(
        "MERGE (a:Person {name: $name}) "
        "MERGE (child:Person {name: $relative_name}) "
        "MERGE (child)-[: Husband_OF]->(a)",
        name=name, relative_name=relative_name, database_="neo4j",
    )

def addNode(lastname):
        response=driver.execute_query(
    "MERGE (p:Person {name: '"+lastname+"'}) RETURN True",
    database_="neo4j",
    )
        driver.close()
        return response

def matchNodeNew(nodename):
        records, result_summary, keys =  driver.execute_query(
                "MATCH (p:Person {name:'"+nodename+"'}) RETURN COUNT(p) > 0 ",
                database_="neo4j",
                )
        #firstname = 'Davies'
        driver.close()
        return records[0]
def addNodeProperty(name,lastname,firstname,othername,email,phone,dateofbirth,userid,country,city):
     driver.execute_query(
                "MATCH (p:Person {name:'"+name+"'}) SET p.lastName ='"+lastname+"',p.firstName='"+firstname+"',p.othername='"+othername+"',p.birthDate='"+dateofbirth+"',p.email='"+email+"',p.phone='"+phone+"',p.userid='"+userid+"',p.country='"+country+"',p.city='"+city+"'  RETURN p",
                database_="neo4j",
                )
        #firstname = 'Davies'
     driver.close()
     return True

def marchScore(driver,firstname, lastName, middleName, email, phone, birthDate):

    score = driver.execute_query(
        "MATCH (a:Person {firstname: $firstname}) "
        "MATCH (child:Person {name: $child_name}) "
        "MERGE (a)-[:FATHER_OF]->(child)",
        name=firstname, child_name=lastName, database_="neo4j",
        
    )
     
    return score;

with GraphDatabase.driver(URI, auth=AUTH) as driver:
    add_father(driver, "Richard", "Salim")
    #add_father(driver, "Richard", "BabyG")
    #add_father(driver, "Sud", "Alloy")
    #add_father(driver, "Salim", "Alloy")
    #add_father(driver, "Davies", "Michael")
   # print_father(driver, "Salim")
    #print_father(driver, "Sud")
    #print_father(driver, "Richard")
