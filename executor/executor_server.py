import json
from flask import Flask
app = Flask(__name__)
from flask import jsonify
from flask import request

import executor_utils as eu

@app.route('build_and_run', methods=['POST'])
def build_and_run():
    data = request.get_json()
    if 'code' not in data or 'lang' not in data:
        return 'You should provide "code" and "lang"'

    code = data['code']
    lang = data['lang']

    print("API got called with code: %s in %s" % (code, lang))

    result = eu.build_and_run(code, lang)

    # convert object to json format string
    return jsonify(result)

# main function
# run program on command line: python executor_server.py
if __name__ == '__main__':
    import sys
    port = int(sys.argv[1]) # port number
    # load docker image
    eu.load_image()
    # monitoring the code change and recompile
    app.run(port = port, debug==True)