import React from "react";
import JobCard from "./JobCard";

/** Used in JobList and CompanyDetail to list jobs. 
 *
 * JobList -> JobCardList -> JobCard
 * CompanyDetail -> JobCardList -> JobCard
 */

function JobCardList({ jobs }) {
  console.debug("JobsCardList", "jobs=", jobs);

  return (
    <div className="JobsCardList">
      {jobs.map(j => (
        <JobCard
          key={j.id}
          id={j.id}
          title={j.title}
          salary={j.salary}
          equity={j.equity}
          companyName={j.companyName}
        />
      ))}
    </div>
  );
}

export default JobCardList;