// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'us-west-2' })

// Declare local variables
const route53 = new AWS.Route53()
const hzId = '/hostedzone/Z10113297519WOFEXRBS'

createRecordSet(hzId)
.then(data => console.log(data))

function createRecordSet (hzId) {
  const params = {
    HostedZoneId: hzId,
    ChangeBatch: {
      Changes: [
        {
          Action: 'CREATE',
          ResourceRecordSet: {
            Name: 'apadax.com', // external dns name
            Type: 'A',
            AliasTarget: {
              DNSName: 'hamsterELB-1593782119.us-west-2.elb.amazonaws.com', // internal AWS DNS name (load balancer)
              EvaluateTargetHealth: false,
              HostedZoneId: 'Z1H1FL5HABSF5' // of the ELB Load Balance
            }
          }
        }
      ]
    }
  }
  // Link to ELB Regions:
  // https://docs.aws.amazon.com/general/latest/gr/elb.html

  return new Promise((resolve, reject) => {
    route53.changeResourceRecordSets(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
