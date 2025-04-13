// src/app/students/page.tsx
import Banner from "@/components/shared/Banner";
import Image from "next/image";
import {Person} from "@/types/index";
import studentsData from "@/data/students.json";

export default function StudentsPage() {
  const students = studentsData as Person[];

  // Separate current students and alumni
  const currentStudents = students.filter(student => student.graduationYear === null);
  const alumni = students.filter(student => student.graduationYear !== null);

  return (
    <>
      <Banner />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">實驗室成員 Lab members</h1>
        <div className="mb-10">
          <h2 className="text-xl !mb-0">博士生 Ph.D. Students</h2>
          <hr className="mb-4 border-t border-gray-200" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            {currentStudents.map(student => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
          <h2 className="text-xl !mb-0">碩士生 M.S. Students</h2>
          <hr className="mb-4 border-t border-gray-200" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            {currentStudents.map(student => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
          <h2 className="text-xl !mb-0">EMBA Students</h2>
          <hr className="mb-4 border-t border-gray-200" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            {currentStudents.map(student => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        </div>
        {alumni.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">校友們 Alumni</h2>
            <div className="mb-10">
              <h2 className="text-xl !mb-0">博士生 Ph.D. Students</h2>
              <hr className="mb-4 border-t border-gray-200" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                {currentStudents.map(student => (
                  <StudentCard key={student.id} student={student} />
                ))}
              </div>
              <h2 className="text-xl !mb-0">碩士生 M.S. Students</h2>
              <hr className="mb-4 border-t border-gray-200" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                {currentStudents.map(student => (
                  <StudentCard key={student.id} student={student} />
                ))}
              </div>
              <h2 className="text-xl !mb-0">EMBA Students</h2>
              <hr className="mb-4 border-t border-gray-200" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                {currentStudents.map(student => (
                  <StudentCard key={student.id} student={student} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

interface StudentCardProps {
  student: Person;
}

const StudentCard = ({student}: StudentCardProps) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md bg-white">
      <div className="p-4">
        <div className="flex items-center mb-4">
          {student.imageUrl && (
            <div className="mr-4 flex-shrink-0">
              <Image
                src={student.imageUrl}
                alt={student.name}
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold">{student.name}</h3>
            {student.chineseName && <p className="text-gray-600">{student.chineseName}</p>}
            <p className="text-sm text-gray-500">{student.status}</p>
          </div>
        </div>

        <div className="text-sm">
          <p><strong>Research:</strong> {student.researchTopic}</p>
          {student.email && <p><strong>Email:</strong> {student.email}</p>}
          {student.graduationYear && <p><strong>Graduated:</strong> {student.graduationYear}</p>}
        </div>
      </div>
    </div>
  );
};