"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Input, Progress } from "@heroui/react";
import { Breadcrumb } from "@/components/bread.crumb";
import { useParams } from "next/navigation";
import { deleteResume, fetchResumes } from "@/services/resume.service";
import ResumeStatsGrid from "../components/stats.card";
import ConfirmDialog from "@/components/ConfirmDialog";
import { showToast } from "@/app/utils/toastUtils";
import { FaSearch } from "react-icons/fa";
import { ResumeAnalyseDrawer } from "../components/resume.analyse.drawer";
import ResumeTable from "../components/resume.table";
import ResumeDropzone from "../components/resume.dropzone";
import { useResumeNotifications } from "../hooks/useResumeNotifications";
import { useResumeSocket } from "../hooks/useResumeSocket";
import { useResumeUpload } from "../hooks/useResumeUpload";
import { filterResumes, paginateResumes, sortResumes } from "../utils/resumeFilters";
import { useResumeDetails } from "../hooks/useResumeDetails";
const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
const PAGE_SIZE = 10;

export default function UploadFiles() {
  const [files, setFiles] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [uploadedResumes, setUploadedResumes] = useState<any[]>([]);
  const { id } = useParams() as { id: string };
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [resumeToDelete, setResumeToDelete] = useState<string | null>(null);
  const [resumeStats, setResumeStats] = useState({ totalCandidates: 0, avgMatchScore: 0, topCandidatesPercent: 0, rejectedCandidates: 0 });
  const { selectedResumeData, isDrawerOpen, handleViewDetails, closeDrawer, loadingResults } = useResumeDetails(id);
  const { notifications } = useResumeNotifications(id);

  const loadResumes = useCallback(async () => {
    const result = await fetchResumes(id);
    setUploadedResumes(result.resumes);
    setResumeStats(result.stats);
    setJobTitle(result.jobTitle);
  }, [id]);

  const handleDeleteClick = (id: string) => {
    setResumeToDelete(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (resumeToDelete) {
      try {
        await deleteResume(id, resumeToDelete);
        setConfirmDialogOpen(false);
        setResumeToDelete(null);
        showToast.success("Resume deleted successfully.");
        await loadResumes();
      } catch (error) {
        console.error("Error deleting interviewer:", error);
        showToast.error("Failed to delete the resume. Please try again.");
      }
    }
  };

  const handleCancelDelete = () => {
    setConfirmDialogOpen(false);
    setResumeToDelete(null);
  };

  useEffect(() => {
    if (notifications.length === 0) return;

    setUploadedResumes((prev) => {
      const updated = prev.map((r) => {
        const notification = notifications.find((n) => n.resumeId === r.resumeId);
        if (!notification) return r;
        return { ...r, analysisResults: notification.analysisResults, status: "processed" };
      });
      return updated;
    });
  }, [notifications]);

  useEffect(() => {
    if (id) loadResumes();
  }, [id, loadResumes]);

  const handleProgress = useCallback(({ file, progress }: { file: string; progress: number }) => {
    const mapped = 50 + Math.floor(progress * 0.5);
    setFiles((prev) =>
      prev.map((f) =>
        f.file.name === file
          ? {
              ...f,
              progress: Math.max(f.progress, mapped),
              status: mapped >= 100 ? "finishing" : "uploading",
            }
          : f
      )
    );
  }, []);

  const handleComplete = useCallback(({ file }: { file: string }) => {
    setFiles((prev) => prev.map((f) => (f.file.name === file ? { ...f, progress: 100, status: "complete" } : f)));
    setUploadedResumes((prev) => prev.map((r) => (r.name === file ? { ...r, progress: 100, status: "uploaded" } : r)));
  }, []);

  const { socket, waitForConnection } = useResumeSocket(handleProgress, handleComplete);
  const { uploadFiles } = useResumeUpload({ id, waitForConnection, setFiles, setUploadedResumes });
  const onDrop = useCallback(
    (accepted: File[]) => {
      const valid = accepted.filter((f) => allowedTypes.includes(f.type));
      const rejected = accepted.filter((f) => !allowedTypes.includes(f.type));

      if (rejected.length) alert("❌ Only .pdf, .doc, .docx allowed.");

      const totalAfterUpload = uploadedResumes.length + valid.length;
      if (totalAfterUpload > 20) {
        showToast.error("You can upload a maximum of 20 resumes.");
        return;
      }

      if (valid.length) uploadFiles(valid);
    },
    [socket, uploadedResumes]
  );

  const uploadingResumes = uploadedResumes.filter((r) => r.status === "uploading");
  const filteredResumes = useMemo(() => filterResumes(uploadedResumes, search), [uploadedResumes, search]);
  const sortedResumes = useMemo(() => sortResumes(filteredResumes), [filteredResumes]);
  const paginatedResumes = useMemo(() => paginateResumes(sortedResumes, currentPage, PAGE_SIZE), [sortedResumes, currentPage]);

  const overallProgress = useMemo(() => {
    if (uploadingResumes.length === 0) return 0;
    const total = uploadingResumes.reduce((sum, r) => sum + (r.progress || 0), 0);
    return Math.round(total / uploadingResumes.length);
  }, [uploadingResumes]);

  const totalPages = Math.ceil(filteredResumes.length / PAGE_SIZE);

  return (
    <div className='my-10 px-4 lg:px-6 max-w-[90rem] mx-auto w-full flex flex-col gap-4'>
      <Breadcrumb
        items={[
          { name: "Dashboard", link: "/" },
          { name: "Job", link: "/jobs/list" },
          { name: "Analyzer", link: null },
        ]}
      />
      <h3 className='text-xl font-semibold mb-5'>Resume Analyzer - {jobTitle}</h3>
      <ResumeStatsGrid resumeStats={resumeStats} />
      <Input value={search} onChange={(e) => setSearch(e.target.value)} labelPlacement='outside' placeholder='Search by name, email, phone, degree...' startContent={<FaSearch className='h-4 w-4 text-muted-foreground' />} type='search' />
      <ResumeDropzone onDrop={onDrop} uploadingCount={uploadingResumes.length} disabled={uploadedResumes.length >= 20 || uploadingResumes.length > 0} />
      {uploadingResumes.length > 0 && <Progress value={overallProgress} label={`Uploading ${uploadingResumes.length} of ${uploadedResumes.length} files`} showValueLabel size='sm' radius='sm' classNames={{ base: "max-w-full", indicator: "bg-gradient-to-r from-purple-500 to-pink-500", label: "text-sm font-medium text-default-700" }} />}
      <ResumeTable resumes={paginatedResumes} files={files} loadingResults={loadingResults} currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} onViewDetails={handleViewDetails} onDelete={handleDeleteClick} onRetryUpload={uploadFiles} />
      <ResumeAnalyseDrawer isOpen={isDrawerOpen} onClose={closeDrawer} resumeData={selectedResumeData} />
      <ConfirmDialog isOpen={isConfirmDialogOpen} onClose={handleCancelDelete} title='Confirm Deletion' description='Are you sure you want to delete this resume?' onConfirm={handleConfirmDelete} confirmButtonText='Delete' cancelButtonText='Cancel' />
    </div>
  );
}
