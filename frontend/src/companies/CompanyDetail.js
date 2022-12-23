import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import Loading from "../Loading";
import JobsCardList from "../jobs/JobsCardList";

/* Renders company details, along with the jobs at that company.
 *
 * Routed at /companies/:handle
 *
 * Routes -> CompanyDetail -> JobCardList
 */

function CompanyDetail() {
  const { handle } = useParams();
  console.debug("CompanyDetail", "handle=", handle);

  const [company, setCompany] = useState(null);

  useEffect(function getCompanyAndJobsForUser() {
    async function getCompany() {
      setCompany(await JoblyApi.getCompany(handle));
    }

    getCompany();
  }, [handle]);

  if (!company) return <Loading />;

  return (
    <div className="CompanyDetail col-md-8 offset-md-2">
      <h4>{company.name}</h4>
      <p>{company.description}</p>
      <JobsCardList jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetail;