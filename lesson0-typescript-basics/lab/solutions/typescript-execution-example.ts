// TypeScript Execution Example
// This file demonstrates both compilation methods

// Interface definition
interface Student {
    id: number;
    name: string;
    age: number;
    grade: 'A' | 'B' | 'C' | 'D' | 'F';
    subjects: string[];
}

// Type alias
type GradeLevel = 'Freshman' | 'Sophomore' | 'Junior' | 'Senior';

// Function with strict typing
function calculateGPA(students: Student[]): number {
    const gradePoints: Record<string, number> = {
        'A': 4.0,
        'B': 3.0,
        'C': 2.0,
        'D': 1.0,
        'F': 0.0
    };

    const totalPoints = students.reduce((sum, student) => {
        return sum + gradePoints[student.grade];
    }, 0);

    return totalPoints / students.length;
}

// Generic function
function findStudentById<T extends Student>(students: T[], id: number): T | undefined {
    return students.find(student => student.id === id);
}

// Class with TypeScript features
class StudentManager {
    private students: Student[] = [];

    addStudent(student: Omit<Student, 'id'>): Student {
        const newStudent: Student = {
            id: this.generateId(),
            ...student
        };
        this.students.push(newStudent);
        return newStudent;
    }

    getStudentById(id: number): Student | undefined {
        return findStudentById(this.students, id);
    }

    getAllStudents(): Student[] {
        return [...this.students]; // Return copy to prevent mutation
    }

    getStudentsByGrade(grade: Student['grade']): Student[] {
        return this.students.filter(student => student.grade === grade);
    }

    calculateClassGPA(): number {
        return calculateGPA(this.students);
    }

    private generateId(): number {
        return Math.max(0, ...this.students.map(s => s.id)) + 1;
    }
}

// Usage example
function main(): void {
    console.log('🎓 TypeScript Execution Example');
    console.log('================================\n');

    // Create student manager
    const manager = new StudentManager();

    // Add some students
    const student1 = manager.addStudent({
        name: 'Alice Johnson',
        age: 20,
        grade: 'A',
        subjects: ['Mathematics', 'Physics', 'Chemistry']
    });

    const student2 = manager.addStudent({
        name: 'Bob Smith',
        age: 19,
        grade: 'B',
        subjects: ['English', 'History', 'Art']
    });

    const student3 = manager.addStudent({
        name: 'Charlie Brown',
        age: 21,
        grade: 'A',
        subjects: ['Computer Science', 'Mathematics', 'Statistics']
    });

    // Display students
    console.log('📚 All Students:');
    manager.getAllStudents().forEach(student => {
        console.log(`- ${student.name} (ID: ${student.id}, Grade: ${student.grade})`);
    });

    // Find student by ID
    console.log('\n🔍 Finding Student by ID:');
    const foundStudent = manager.getStudentById(2);
    if (foundStudent) {
        console.log(`Found: ${foundStudent.name} - ${foundStudent.subjects.join(', ')}`);
    }

    // Students by grade
    console.log('\n📊 Students with Grade A:');
    const gradeAStudents = manager.getStudentsByGrade('A');
    gradeAStudents.forEach(student => {
        console.log(`- ${student.name}`);
    });

    // Calculate GPA
    console.log('\n📈 Class GPA:');
    const gpa = manager.calculateClassGPA();
    console.log(`Average GPA: ${gpa.toFixed(2)}`);

    // Type safety demonstration
    console.log('\n🛡️ Type Safety Demo:');
    try {
        // This would cause a TypeScript error if uncommented:
        // manager.addStudent({ name: 'Test', age: 'invalid' }); // Error: age should be number

        console.log('✅ All operations completed successfully with type safety!');
    } catch (error) {
        console.log('❌ Error:', error);
    }
}

// Run the main function
if (require.main === module) {
    main();
}

export { Student, StudentManager, calculateGPA, findStudentById };
