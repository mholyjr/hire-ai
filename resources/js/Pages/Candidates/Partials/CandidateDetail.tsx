import React from "react";
import { Candidate } from "@/types";
import { Badge } from "@/Components/ui/badge";

export const CandidateDetail = ({ candidate }: { candidate: Candidate }) => {
  return (
    <>
      <div>
        <h3 className="text-lg font-semibold">Contact Information</h3>
        <p>Email: {candidate.email}</p>
        <p>Phone: {candidate.phone}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Summary</h3>
        <p>{candidate.ai_rating?.summary}</p>
      </div>
      {candidate.ai_rating && (
        <div>
          <h3 className="text-lg font-semibold">Pros & Cons</h3>
          <div className="flex space-x-4">
            <div>
              <h4 className="font-medium">Pros</h4>
              <ul className="list-disc pl-5">
                {candidate.ai_rating?.pros?.map((pro, index) => (
                  <li key={index}>{pro}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium">Cons</h4>
              <ul className="list-disc pl-5">
                {candidate.ai_rating?.cons.map((con, index) => (
                  <li key={index}>{con}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      {candidate.cv_data && (
        <>
          <div>
            <h3 className="text-lg font-semibold">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.cv_data.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Education</h3>
            {candidate?.cv_data?.education?.map((edu, index) => (
              <div key={index} className="mb-2">
                <p className="font-medium">
                  {edu.Degree} in {edu.Field}
                </p>
                <p>
                  {edu.Institution}, {edu.Year}
                </p>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-lg font-semibold">Experience</h3>
            {candidate.cv_data.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{exp.Role}</p>
                <p>
                  {exp.Company}, {exp.Years}
                </p>
                <ul className="list-disc pl-5 mt-2">
                  {exp.Responsibilities.map((resp, respIndex) => (
                    <li key={respIndex}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
