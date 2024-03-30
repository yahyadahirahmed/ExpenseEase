const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
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
    const employeeIDs = await prisma.claims.findMany({
        where: { approved: false, rejected: false},
    });
    return employeeIDs; 
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