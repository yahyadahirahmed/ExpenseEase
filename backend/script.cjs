const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    // const shush = await prisma.claims.update({
    //         where: {
    //             id: 53,
    //         },
    //         data: {
    //             approved: false,
    //             rejected: false,
    //         },
    //     });
    // Delete all claims associated with the employee
//    const del =  await prisma.claims.deleteMany({
//         where: {
//             id: {
//                 gt: 0,
//             }
//         },
//     });

    // Now it's safe to delete the employee
    // const employee = await prisma.employee.delete({
    //     where: {
    //         id: 6,
    //     },
    // });
}

// Make sure to export functions directly
async function authenticateEmployee(email, password) {
    const employee = await prisma.employee.findUnique({
        where: { email: email },
    });
    if (employee && employee.password === password) {
        return true;
    } else {
        return false;
    }
}
 async function findEmployee(email, password) {
    const employee = await prisma.employee.findUnique({
        where: { email: email },
    });
    return employee;
}

 async function getEmployeeDetails(employeeId) {
    const employeeDetails = await prisma.employee.findUnique({
        where: { id: employeeId },
        include: { claims: true },
    });
    return employeeDetails;
}
 async function findEmployeeClaims(employeeId) {
    const employeeClaims = await prisma.Claims.findMany({
        where: { employeeId: employeeId}
    });
    return employeeClaims;
}

async function findClaims() {
    const claims = await prisma.claims.findMany({
      where: {
        approved: false,
        rejected: false,
        employee: {
          type: "employee", // Assuming 'type' is a field in the 'Employee' model that specifies the employee type
        },
      },
      include: {
        employee: true, // Include employee data in the result
      },
    });
    return claims;
  }
  

// Function to create claims after a make claim form has been submitted by an employee
async function createClaim(employeeId, employeeName ,description, amount, filePath) {
    // Convert amount to a number if it's a string
    amount = parseFloat(amount);
    employeeId = parseFloat(employeeId);
   let variable = employeeName;
   let variable2 = description;
   if (variable === undefined && variable2 === undefined) {
         throw new Error('values undifeined');
   }
    if (!employeeId || !description || isNaN(amount) || !employeeName) {
      throw new Error('Missing or invalid input');
    }
  
    try {
      const newClaim = await prisma.claims.create({
        data: {
          employeeId: parseInt(employeeId), // Make sure to convert to number if needed
          employeeName,
          description,
          amount, // Pass the converted amount
          filePath,
          approved: false,
          rejected: false,
        },
      });
      console.log("Claim created successfully:", newClaim);
      return newClaim;
    } catch (error) {
      console.error("Error creating claim:", error);
      throw error; // Rethrow the error to handle it in the server.js
    }
  }

  async function createAccount(employeeName, employeeEmail, employeePassword, type) {
    // Basic validation checks
    if (!employeeName || typeof employeeName !== 'string' || employeeName.trim() === '') {
        throw new Error('Invalid or missing employee name.');
    }
    if (!employeeEmail || typeof employeeEmail !== 'string' || employeeEmail.trim() === '' || !employeeEmail.includes('@')) {
        throw new Error('Invalid or missing employee email.');
    }
    if (!employeePassword || typeof employeePassword !== 'string' ) {
        throw new Error('Invalid or missing employee password.');
    }
    if (!type || (type !== 'employee' && type !== 'LineManager' && type !== 'admin' && type !== 'SuperManager')) {
        throw new Error('Invalid or missing employee type.');
    }

    try {
        const newEmployee = await prisma.employee.create({
            data: {
                name: employeeName,
                email: employeeEmail,
                password: employeePassword,
                type: type
            },
        });
        console.log("Employee created successfully:", newEmployee);
        return newEmployee;
    } catch (error) {
        console.error("Error creating employee:", error);
        throw error; // Ensure the error is thrown to be caught where the function is called
    }
}

  
// Function to accept a claim by setting 'approved' to true and 'rejected' to false
async function acceptClaim(claimId) {
    try {
        const updatedClaim = await prisma.claims.update({
            where: {
                id: claimId,
            },
            data: {
                approved: true,
                rejected: false,
            },
        });
        console.log("Claim accepted successfully:", updatedClaim);
        return updatedClaim;
    } catch (error) {
        console.error("Error accepting claim:", error);
        return null;
    }
}

// Function to reject a claim by setting 'rejected' to true and 'approved' to false
async function rejectClaim(claimId) {
    try {
        const updatedClaim = await prisma.claims.update({
            where: {
                id: claimId,
            },
            data: {
                approved: false,
                rejected: true,
            },
        });
        console.log("Claim rejected successfully:", updatedClaim);
        return updatedClaim;
    } catch (error) {
        console.error("Error rejecting claim:", error);
        return null;
    }
}

async function findLMClaims() {
    const claims = await prisma.claims.findMany({
        where: {
          approved: false,
          rejected: false,
          employee: {
            type: "LineManager", // Assuming 'type' is a field in the 'Employee' model that specifies the employee type
          },
        },
      });
      return claims;
}


// Removed the main function execution and exports for simplicity
main()
.catch(e => {
    console.error(e.message);
})
.finally(async () => {
    await prisma.$disconnect();
});
exports.authenticateEmployee = authenticateEmployee;
exports.getEmployeeDetails = getEmployeeDetails;
exports.findEmployee = findEmployee;
exports.findEmployeeClaims = findEmployeeClaims;
exports.findClaims = findClaims;
exports.acceptClaim = acceptClaim;
exports.rejectClaim = rejectClaim;
exports.createClaim = createClaim;
exports.createAccount = createAccount;
exports.findLMClaims = findLMClaims;