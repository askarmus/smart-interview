// pages/api/upload/sign.ts
import { NextApiRequest, NextApiResponse } from "next";
import { Storage } from "@google-cloud/storage";
const credentials = JSON.parse(
  Buffer.from(
    "ewogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsCiAgInByb2plY3RfaWQiOiAiaW50ZXJ2aWV3LWFpLTQzODMwMyIsCiAgInByaXZhdGVfa2V5X2lkIjogImI3MzRlMTFmNjQyNDBjYjU1NjFmOTgzNTAzZjgzZGU3OWI3ZDkxNzkiLAogICJwcml2YXRlX2tleSI6ICItLS0tLUJFR0lOIFBSSVZBVEUgS0VZLS0tLS1cbk1JSUV2UUlCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktjd2dnU2pBZ0VBQW9JQkFRQzFnZ002VWhKNGl6QlNcbkt4RzRTZ1BBKzF2a1BITS9SeUtSRUhsUjFLZWtEVjBGTEZ0bUg2bDk2WmFYaTRVdTl5UWlSVDdXTVRJaEluUm1cbkcyOFhNc0xMSWcxdnlQOXNaOENvd3Y2cVdmSEkwNzE5TmFvUWdIeDFKT013VmJmYnNEdXV5R0ZIL1gvQXNtTkdcbko1WkI5ZlpURWpYR0NhQUR4NExER25xQ2V4eENwWUU5bS9qK2duK0ZDaVo5Q3E3Nkx0K1R2c3ZzakFLUGJkL3lcbjBneWMwMnBkSXhTM2NhQWNCdWlOYmZ2ZDE2c054UkZBQnpkQ1Yvd056V0tZckE2MVRLU0l3eUZpanVRdnF5NEtcbk93NWNKbU55TUVVZHU0cUlGb0FEa3lSRUlQTHZFNDNXWVdqdDErL1htbEFMVjVkWGM5SjdicWllbHFYZjFYeE5cbmFMQ3E2UEQ1QWdNQkFBRUNnZ0VBQms0NXQvczFicEFoVWQxeXJHVVAyOUt2cHM1dHo0YzBYWGRGeTdDNFVUUHdcbnBSY2RKcjlYVjBzMzR0UmpRRll3SUd1bzZ1NkRHQkVYRzV2ODRFQ3djVGVoNFY0SmQ1WGtKTWkvYWFJZHl2VUdcbktuVWtqeFd6blNzMnBFMTZDVzBHS2NTRzBxWXRHNy9td0g5c0VpY09FMlU0em9RemxhWUc5aW16azFoZEN6aWZcbk40TGNRckpoL2pFandwZEcwRHlVc1VWMWpyK1o2N0tiQWhEOUV4RzBhbDNnbUovdkw3STJFVGxlQXJEQmpIdHZcbnZYUHdoYmpWaWt5NjR1eHRLcEpOb2JLMlFzc0orNlQrRUJmMXk1MG1vU0xOdmwxRHkwY0JHZFlrNGRMV25XaHBcbm1OR3lvWm9JdkpqTEc2NXVJajYwTUJTMXEzdDRZKzNWTXhvRUNJMnR2UUtCZ1FEZ0JNWGZIMTVlYTNYdWxkYmZcbmI5cTZWTWlpSmZBaXI0dXVlZHdqcWdud0Y2d1JsSHp5K2lrM2t0RTI5bnpteE1jd2JneDY3VFhaL2FvSVFDYzBcbm8zZENQSWVISklzd0hwSHBQY3ZuSlJlTkY0RitEQyt4TmNtRDR1NDdOcjRjak90MUVxeEVBbWtURWFyNjRPbDhcblZnZ2tzeTRJZ0NvRUFzdmFnbkd0Z3pNTm5RS0JnUURQYTVoQmpvK2hNSjFOcWFNR2pQUndKZlJhOGdWM052QWtcbkVweVBURjcvYStvMlV6ZTJYYXNCeloyQWN1Ulc2TlFHY2JXekgxRi9XSXc5U21hSjlLaVUzakxrbCtDWE83QkFcbjhCTk5KOVFJRElzMEhnM3M0YWhVS0ptVjRMR3hqemJhcEpXallkQ1hmcXdLdEZ6ZDJKZzl1eHUrcHpGckZuOTdcbjJmT1lobkpBRFFLQmdDVzY2QkRDV2NTUldOV01TeHBxM200UHBaTVp6SzRxM3QzT0RITzlTZHMwUVhqY2g0YnNcbjkxQXkzQ1hqc2ZtMEh0QmJXS0xEblJSUUV2azh4TjJxd29WWGFJUXNkWHp2U1NmOWpvQXAwU09rVjkwQTlHOW1cblhjQm0walVLN1U0bHRlcUw4Sk9yekVLMzhSSThHMWNqcms5d0ZrcThPMWRkbVRQK1VHTW0rOHhKQW9HQkFMZkxcblIyY1B4QVc0NWlwakhxbzNUSUh6bjhyV21qRkE1Um1SeEZqViszZXBVQ2hESlNMYmJTUno1aFJqdWlHb3ZmZlhcbjJvR1dSc2pvMVp1WnliS0VzTHo1QjIrM2hMTjltSGh5UXlnakdxYm5OcEkvNzJidnJoQ2t5VE1kbjFjTzZEUmxcbmtwTHJvY0liNUthM20zS1k4bzRBdGwwQ0diQWloMlJmaEpLcXo2SWhBb0dBRnRKTlVNdEVxR2tOdFNwRDB6MGZcbkRnOHMrdmhLQ1RMOW1lVEdaZnlGajVsdWxRRk1IV2ZVRXRLdG80cnZ6QzZnaHlncGxXQytwTTk1RzNDZ3VqSk1cbjRYcFczZ3QyUFVpLzJsU2xFTHI5dWFkWDUzbTNQUDdKSk1oblI2cWppcmRBN0ZjVlFrYmRWYTVhZFZUWTJOLytcbjAvYkkyc0Y3a2xhYmJCMk0ydXZWWVNvPVxuLS0tLS1FTkQgUFJJVkFURSBLRVktLS0tLVxuIiwKICAiY2xpZW50X2VtYWlsIjogInRleHQtdG8tc3BlZWNoLXNlcnZpY2VAaW50ZXJ2aWV3LWFpLTQzODMwMy5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsCiAgImNsaWVudF9pZCI6ICIxMDA0NTEwNTA3MDc5MTA4NDkyNTIiLAogICJhdXRoX3VyaSI6ICJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20vby9vYXV0aDIvYXV0aCIsCiAgInRva2VuX3VyaSI6ICJodHRwczovL29hdXRoMi5nb29nbGVhcGlzLmNvbS90b2tlbiIsCiAgImF1dGhfcHJvdmlkZXJfeDUwOV9jZXJ0X3VybCI6ICJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9vYXV0aDIvdjEvY2VydHMiLAogICJjbGllbnRfeDUwOV9jZXJ0X3VybCI6ICJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9yb2JvdC92MS9tZXRhZGF0YS94NTA5L3RleHQtdG8tc3BlZWNoLXNlcnZpY2UlNDBpbnRlcnZpZXctYWktNDM4MzAzLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwKICAidW5pdmVyc2VfZG9tYWluIjogImdvb2dsZWFwaXMuY29tIgp9Cg==",
    "base64"
  ).toString("utf-8")
);

const storage = new Storage({ credentials });

const bucketName = "evalsy-storage";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { fileName, chunkIndex, contentType } = req.body;

    // Generate a resumable upload session
    const file = storage.bucket(bucketName).file(fileName);
    const [signedUrl] = await file.createResumableUpload({
      origin: "http://localhost:3000",
      metadata: {
        contentType,
        metadata: {
          sessionId: req.body.sessionId,
          chunkIndex: chunkIndex.toString(),
        },
      },
    });

    res.status(200).json({
      signedUrl,
      uploadId: signedUrl, // Using the signed URL as the upload ID
      chunkNumber: chunkIndex + 1,
    });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    res.status(500).json({
      message: "Error generating signed URL",
      retryable: true,
    });
  }
}
