import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    
    const findEmployee = await prisma.employee.findMany({
        include: { claims: true },
    });
}


// Make sure to export functions directly
export async function authenticateEmployee(email, password) {
    const employee = await prisma.employee.findUnique({
        where: { email },
    });
    return employee !== null && employee.password === password;
}

export async function getEmployeeDetails(employeeId) {
    const employeeDetails = await prisma.employee.findUnique({
        where: { id: employeeId },
        include: { claims: true },
    });
    return employeeDetails;
}
// Removed the main function execution and exports for simplicity

main()
    .catch(e => {
        console.error(e.message);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
