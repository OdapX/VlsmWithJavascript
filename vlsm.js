let major_network = "192.168.1.0/24";
const subnets = [
  { name: "A", hosts: 60, adr_reseau: "" },
  { name: "B", hosts: 30, adr_reseau: "" },
  { name: "C", hosts: 30, adr_reseau: "" },
];

subnets[0].adr_reseau = "10";

console.log(subnets[0]);
function order_by_hosts(subnets) {}

// we need to find the closest 2 power to the number
//of hosts needed by the subnetwork

function find_two_power(hosts) {
  for (let i = 0; i <= 10; i++) {
    if (hosts <= Math.pow(2, i) - 2) {
      return i;
    }
  }
}

function Mask_FINDER(hosts) {
  cidr = 32 - find_two_power(hosts);
  binary_mask = "";
  decimal_mask = "";

  for (let i = 1; i <= cidr; i++) {
    binary_mask += "1";
  }

  for (let i = 0; i < find_two_power(hosts); i++) {
    binary_mask += "0";
  }

  for (let i = 1; i <= 32; i++) {
    if (i % 8 == 0) {
      temp_slice = binary_mask.slice(i - 8, i);
      decimal_mask = decimal_mask + parseInt(temp_slice, 2).toString() + ".";
    }
  }

  return ["/" + cidr, decimal_mask];
}

console.log(Mask_FINDER(60));
