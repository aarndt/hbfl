// Imports
const AWS = require('aws-sdk')
const helpers = require('./helpers')

AWS.config.update({region: 'us-west-2'})
// Declare local variables
const ec2 = new AWS.EC2()

const sgName = 'hamster_sg'
const keyName = 'hamster_key'

// Do all the things together
// createSecurityGroup(sgName)
// .then(() => {
//   return createKeyPair(keyName)
// })
// .then(helpers.persistKeyPair)
// .then(() => {
createInstance(sgName, keyName)
.then((data) => {
  console.log('Created instance with:', data)
})
.catch((err) => {
  console.error('Failed to create instance with:', err)
})

// Create functions

function createSecurityGroup (sgName) {
  const params = {
    Description: sgName,
    GroupName: sgName
  }
  
  return new Promise((resolve, reject) => {
    ec2.createSecurityGroup(params, (err, data) => {
      if (err) reject(err);
      else {
        const params = {
          GroupId: data.GroupId,
          IpPermissions: [
            {
              IpProtocol: 'tcp',
              FromPort: 22, 
              ToPort: 22,
              IpRanges: [
                {
                  CidrIp: '0.0.0.0/0'
                }
              ]
            },
            {
              IpProtocol: 'tcp',
              FromPort: 3000, 
              ToPort: 3000,
              IpRanges: [
                {
                  CidrIp: '0.0.0.0/0'
                }
              ]
            }
          ]
        }
        ec2.authorizeSecurityGroupIngress(params, (err) => {
          if (err) reject(err)
          else resolve()
        })
      }
    })
})
}

function createKeyPair (keyName) {
  const params = {
    KeyName: keyName
  }

  return new Promise((resolve, reject) => {
    ec2.createKeyPair(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

function createInstance (sgName, keyName) {
  const params = {
    ImageId: 'ami-0f2e3172d956fe8d1',
    InstanceType: 't2.micro',
    KeyName: keyName,
    MaxCount: 1,
    MinCount: 1,
    SecurityGroups: [
      sgName
    ],
    UserData: 'IyEvYmluL2Jhc2gKc3VkbyBhcHQtZ2V0IHVwZGF0ZQpzdWRvIGFwdC1nZXQgLXkgaW5zdGFsbCBnaXQKZ2l0IGNsb25lIGh0dHBzOi8vZ2l0aHViLmNvbS9hYXJuZHQvaGJmbC5naXQgL2hvbWUvYml0bmFtaS9oYmZsCmNob3duIC1SIGJpdG5hbWk6IC9ob21lL2JpdG5hbWkvaGJmbApjZCAvaG9tZS9iaXRuYW1pL2hiZmwKc3VkbyBucG0gaQpzdWRvIG5wbSBydW4gc3RhcnQ='
  }
  
  return new Promise((resolve, reject) => {
    ec2.runInstances(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
