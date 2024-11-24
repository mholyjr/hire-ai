import React from "react";
import { Candidate } from "@/types";
import { Badge } from "@/Components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

export const CandidateDetail = ({ candidate }: { candidate: Candidate }) => {
  console.log(candidate)
  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader>
          <CardTitle>{candidate.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Email: {candidate.email}</p>
          <p>Phone: {candidate.phone}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{candidate.ai_rating?.summary}</p>
        </CardContent>
      </Card>
      {candidate.ai_rating && (
        <Card>
          <CardHeader>
            <CardTitle>Pros & Cons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
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
          </CardContent>
        </Card>
      )}
      {candidate.cv_data && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {candidate.cv_data.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
