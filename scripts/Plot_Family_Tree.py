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

    # Set the position of the user to the center of the graph
    node_name = user_document['firstName'] + '\n' + user_document['lastName']
    if node_name not in G:
        G.add_node(node_name)
    G.nodes[node_name]['pos'] = (0, 0)
    
    # Build the family tree recursively
    def build_family_tree(user_document):
        user_name = f"{user_document['firstName']}\n{user_document['lastName']}"

        # Add the user as a node if not already added
        G.add_node(user_name)

        # Initialize counters
        sibling_counter = 0.25

        # Inialize chiidren counter
        children_counter = 0.25

        # Add relations as edges with labels (reversed direction)
        if 'relations' in user_document:
            for relation in user_document['relations']:
                related_user = collection.find_one({"userId": relation['userId']})
                if related_user:
                    related_user_name = f"{related_user['firstName']}\n{related_user['lastName']}"
                    relation_label = relation['relationshipType']
                    G.add_node(related_user_name)
                    G.add_edge(related_user_name, user_name, label=relation_label)
                    if relation_label == 'Wife' or relation_label == 'Husband':
                        # set the position of the wife or husband to the right of the user
                        G.nodes[related_user_name]['pos'] = (1, 0)

                    if relation_label == 'Mother':
                        # set the position of the mother to the top-left of the user
                        G.nodes[related_user_name]['pos'] = (-0.25, 1)

                    if relation_label == 'Father':
                        # set the position of the father to the top-right of the user
                        G.nodes[related_user_name]['pos'] = (0.25, 1)

                    if relation_label == 'Son':
                        # set the position of the Son to the bottom of the user
                        G.nodes[related_user_name]['pos'] = (1-children_counter, -1)
                        children_counter += 0.75

                    if relation_label == 'Daughter':
                        # set the position of the daughter to the bottom of the user
                        G.nodes[related_user_name]['pos'] = (1-children_counter, -1)
                        children_counter += 0.75

                    if relation_label == 'Brother':
                        # set the position of the brother to the left of the user
                        G.nodes[related_user_name]['pos'] = (-1, 1-sibling_counter)
                        sibling_counter += 0.75

                    if relation_label == 'Sister':
                        # set the position of the sister to the right of the user
                        G.nodes[related_user_name]['pos'] = (-1 , 1-sibling_counter)
                        sibling_counter += 0.75

    build_family_tree(user_document)

    # Visualize the graph
    pos = nx.get_node_attributes(G, 'pos')
    plt.figure(figsize=(12, 8))
    nx.draw_networkx(G, pos, with_labels=True, node_size=7000, node_color='lightblue', font_size=12)
    labels = nx.get_edge_attributes(G, 'label')
    nx.draw_networkx_edge_labels(G, pos, edge_labels=labels, font_size=10)
    plt.title(f"Family Tree: {user_document['firstName']} {user_document['lastName']}")
    plt.axis('off')

    # Save the graph as an image to public_files/images directory
    plt.savefig(f"public_files/images/{user_document['userId']}.jpg")

build_family_tree()