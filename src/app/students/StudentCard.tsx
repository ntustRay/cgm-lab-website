// src/app/students/StudentCard.tsx
import Image from "next/image";
import {Student} from "@/types/index";

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
          <p><strong>E-mail:</strong> {student.email}</p>
          {student.personalLink && (
            <p>
              <strong>個人網頁:</strong> <a href={student.personalLink} target="_blank" rel="noopener noreferrer">點我</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCard;