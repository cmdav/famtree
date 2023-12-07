import networkx as nx
import matplotlib.pyplot as plt
from pymongo import MongoClient
import sys

def build_family_tree():
    # Replace 'your_connection_string' with your MongoDB Atlas connection string
    client = MongoClient('mongodb+srv://applogin:wCl6QndJsayuLtOq@cluster0.ygx79sq.mongodb.net')
    db = client['FamTree']
    collection = db['profiles']

    # Retrieve the userId from the command line arguments
    userId = sys.argv[1]

    # Retrieve the user document for using the userId
    user_document = collection.find_one({"userId": userId})

    # Create a directed graph
    G = nx.DiGraph()

    def build_family_tree(user_document):
        user_name = f"{user_document['firstName']} {user_document['lastName']}"

        # Add the user as a node
        G.add_node(user_name)

        # Add relations as edges with labels (reversed direction)
        if 'relations' in user_document:
            for relation in user_document['relations']:
                related_user = collection.find_one({"userId": relation['userId']})
                if related_user:
                    related_user_name = f"{related_user['firstName']} {related_user['lastName']}"
                    relation_label = relation['relationshipType']
                    G.add_node(related_user_name)
                    G.add_edge(related_user_name, user_name, label=relation_label)
                    build_family_tree(related_user)

    build_family_tree(user_document)

    # Visualize the graph
    pos = nx.spring_layout(G)
    plt.figure(figsize=(12, 8))
    nx.draw_networkx(G, pos, with_labels=True, node_size=10000, node_color='lightblue', font_size=12, font_weight='bold')
    labels = nx.get_edge_attributes(G, 'label')
    nx.draw_networkx_edge_labels(G, pos, edge_labels=labels, font_size=10)
    plt.title(f"Family Tree: {user_document['firstName']} {user_document['lastName']}")
    plt.axis('off')

    # Save the graph as an image to public_files/images directory
    plt.savefig(f"public_files/images/{user_document['userId']}.jpg")

build_family_tree()