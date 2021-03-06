# Example diagram
![image of architecture diagram](https://github.com/ACaller/react-d3-architecture-diagram/blob/master/src/example/example-screenshot.png?raw=true)

## Usage
Use this diagram to visualise the state of deployments or just to draw out architecture. 
I use it in combination with a script that gets all kubernetes deployments and github versions to check that what we think has deployed actually has, and added some dropdowns to flick between environments or change the most upstream service.

See when deployments are out of sync with their corresponding branch versions, when services are calling deprecated code or when you forgot to tag your prod release!

# Example Input


```json
{
  "Service-A": {
    "name": "Service-A",
    "tag": "v1.1.0",
    "version": "1.1.0",
    "branchVersion": "1.1.0",
    "downstreams": [
      {
        "service": "Service-B",
        "action": "brainwash:answers",
        "version": "v2.3.1"
      },
      {
        "service": "Service-C",
        "action": "complicate:answers",
        "version": "v2.4.0"
      }
    ]
  },
  "Service-B": {
    "name": "Service-B",
    "tag": "v1.2.0",
    "version": "1.2.0",
    "branchVersion": "1.2.0",
    "selfRouting": {
      "brainwash:answers": {
        "latest": "v3.0.0",
        "noVersionPath": "v3.0.0",
        "v2.3.1": {
          "deprecated": true
        }
      }
    },
    "downstreams": [
      {
        "service": "Service-D",
        "action": "debunk:answers",
        "version": "v2.3.1"
      },
      {
        "service": "Service-E",
        "action": "eradicate:false-answers",
        "version": "v2.0.1"
      },
      {
        "service": "Service-F",
        "action": "fabricate:answers",
        "version": "v2.3.1"
      }
    ]
  },
  "Service-C": {
    "name": "Service-C",
    "tag": "v4.5.2",
    "version": "4.5.2",
    "branchVersion": "4.6.0",
    "selfRouting": {
      "complicate:answers": {
        "latest": "v3.0.0",
        "noVersionPath": "v3.0.0",
        "v2.6.5": {
          "deprecated": true
        }
      }
    }
  },
  "Service-D": {
    "name": "Service-D",
    "tag": "v6.0.3",
    "version": "6.0.3",
    "branchVersion": "6.0.3",
    "selfRouting": {
      "debunk:answers": {
        "latest": "v2.3.1",
        "noVersionPath": "v2.3.1",
        "v2.3.1": {}
      }
    }
  },
  "Service-E": {
    "name": "Service-E",
    "tag": "v2.0.1",
    "version": "2.0.1",
    "branchVersion": "2.0.1",
    "selfRouting": {
      "eradicate:false-answers": {
        "latest": "v2.0.1",
        "noVersionPath": "v2.0.1",
        "v2.0.1": {}
      }
    }
  },
  "Service-F": {
    "name": "Service-F",
    "tag": "v1.0.0",
    "version": "1.1.0",
    "branchVersion": "1.1.0",
    "selfRouting": {
      "fabricate:answers": {
        "latest": "v2.3.1",
        "noVersionPath": "v2.0.0",
        "v2.0.0": {
          "deprecated": true
        }
      }
    }
  }
  
}

```
