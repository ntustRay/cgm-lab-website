// src/app/students/page.tsx
import Banner from "@/components/shared/Banner";
import { Student } from "@/types/index";
import studentsData from "../../../public//data/students.json";
import StudentCard from "./StudentCard"; // Import the StudentCard component

const students = studentsData as Student[];

export default function StudentsPage() {
  const currentStudents = students.filter(student => !student.graduated);
  const alumni = students.filter(student => student.graduated);

  return (
    <>
      <Banner />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">實驗室成員 Lab members</h1>
        <div className="mb-10">
          {renderStudentCategory(currentStudents, "PhD")}
          {renderStudentCategory(currentStudents, "MS")}
          {renderStudentCategory(currentStudents, "EMBA")}
        </div>
        {alumni.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">校友們 Alumni</h2>
            <div className="mb-10">
              {renderStudentCategory(alumni, "PhD")}
              {renderStudentCategory(alumni, "MS")}
              {renderStudentCategory(alumni, "EMBA")}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const renderStudentCategory = (students: Student[], status: string) => (
  <>
    <h2 className="text-xl !mb-0">{status === "PhD" ? "博士生 Ph.D. Students" : status === "MS" ? "碩士生 M.S. Students" : "EMBA Students"}</h2>
    <hr className="mb-4 border-t border-gray-200" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
      {students
        .filter(student => student.status === status)
        .map(student => (
          <StudentCard key={student.id} student={student} />
        ))}
    </div>
  </>
);