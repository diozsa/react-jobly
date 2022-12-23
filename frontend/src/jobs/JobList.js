import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import Loading from "../Loading";
import SearchForm from "../SearchForm";
import JobsCardList from "./JobsCardList";

/** Renders list of jobs.
 *
 * On mount, loads jobs from API - no filter applied.
 * Re-loads filtered jobs on submit from search form.
 *
 * JobList -> JobCard
 *
 * This is routed to at /jobs
 */

function JobList() {
  console.debug("JobList");

  const [jobs, setJobs] = useState(null);

  useEffect(function getAllJobsOnMount() {
    console.debug("JobList useEffect getAllJobsOnMount");
    search();
  }, []);

  /** Running for search form submit, rerenders jobs. */
  async function search(title) {
    let jobs = await JoblyApi.getJobs(title);
    setJobs(jobs);
  }

  if (!jobs) return <Loading />;

  return (
    <div className="JobList col-md-8 offset-md-2">
      <SearchForm searchFor={search} />
      {jobs.length
        ? <JobsCardList jobs={jobs} />
        : <p className="lead">Sorry, no results were found!</p>
      }
    </div>
  );
}

export default JobList;