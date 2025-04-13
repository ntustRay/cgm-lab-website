// src/app/students/page.tsx
import Banner from "@/components/shared/Banner";
import Image from "next/image";
import {Student} from "@/types/index";
import studentsData from "@/data/students.json";

// Assuming Person type looks something like this based on the JSON:

// Assuming studentsData is an array of Person objects
const students = studentsData as Student[];

export default function StudentsPage() {
  // Separate current students and alumni based on the 'graduated' field
  const currentStudents = students.filter(student => !student.graduated);
  const alumni = students.filter(student => student.graduated);

  return (
    <>
      <Banner />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">實驗室成員 Lab members</h1>
        <div className="mb-10">
          <h2 className="text-xl !mb-0">博士生 Ph.D. Students</h2>
          <hr className="mb-4 border-t border-gray-200" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            {currentStudents
              .filter(student => student.status === "PhD")
              .map(student => (
                <StudentCard key={student.id} student={student} />
              ))}
          </div>
          <h2 className="text-xl !mb-0">碩士生 M.S. Students</h2>
          <hr className="mb-4 border-t border-gray-200" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            {currentStudents
              .filter(student => student.status === "MS")
              .map(student => (
                <StudentCard key={student.id} student={student} />
              ))}
          </div>
          <h2 className="text-xl !mb-0">EMBA Students</h2>
          <hr className="mb-4 border-t border-gray-200" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            {currentStudents
              .filter(student => student.status === "EMBA")
              .map(student => (
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
                {alumni
                  .filter(student => student.status === "PhD")
                  .map(student => (
                    <StudentCard key={student.id} student={student} />
                  ))}
              </div>
              <h2 className="text-xl !mb-0">碩士生 M.S. Students</h2>
              <hr className="mb-4 border-t border-gray-200" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                {alumni
                  .filter(student => student.status === "MS")
                  .map(student => (
                    <StudentCard key={student.id} student={student} />
                  ))}
              </div>
              <h2 className="text-xl !mb-0">EMBA Students</h2>
              <hr className="mb-4 border-t border-gray-200" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                {alumni
                  .filter(student => student.status === "EMBA")
                  .map(student => (
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
  student: Student;
}

const StudentCard = ({student}: StudentCardProps) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md bg-white">
      <div className="p-4">

        {student.imageUrl && (
          <div className="flex-shrink-0 mb-4">
            <Image
              src={student.imageUrl}
              alt={student.name}
              width={0}
              height={0}
              className="rounded-lg object-cover w-full h-40"
            />
          </div>
        )}

        <div className="text-sm">
          <h3 className="text-lg font-semibold !mb-0">{student.name}</h3>
          <p><strong>學年:</strong> {student.academicYear}</p>
          <p><strong>興趣:</strong> {student.hobby}</p>
          <p><strong>專長:</strong> {student.expert}</p>
          {student.personalLink && (
            <p>
              <strong>個人網頁:</strong> <a href={student.personalLink} target="_blank" rel="noopener noreferrer">點我</a>
            </p>
          )}
          <p><strong>E-mail:</strong> {student.email}</p>
        </div>
      </div>
    </div>
  );
};