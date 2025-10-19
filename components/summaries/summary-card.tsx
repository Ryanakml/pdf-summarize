import { Card } from "@/components/ui/card";
import DeleteButton from "./delete-button";
import Link from "next/link";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const SummaryHeader = ({
  fileUrl,
  title,
  createdAt,
}: {
  fileUrl: string;
  title: string | null;
  createdAt: string;
}) => {
  return (
    <div className="flex items-start gap-3 mb-3">
      <FileText className="w-7 h-7 text-purple-600 mt-1 flex-shrink-0 transition-transform duration-300 group-hover:rotate-6" />
      <div className="flex-1 min-w-0">
        <h3 className="text-base xl:text-lg font-semibold text-gray-900 truncate">
          {title || "Untitled"}
        </h3>
        <p className="text-sm text-gray-500">{createdAt}</p>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={cn(
        "px-3 py-1 text-xs font-medium rounded-full capitalize transition-all",
        {
          "bg-green-100 text-green-800 border border-green-200":
            status === "completed",
          "bg-yellow-100 text-yellow-800 border border-yellow-200":
            status === "processing",
          "bg-red-100 text-red-800 border border-red-200": status === "failed",
        }
      )}
    >
      {status}
    </span>
  );
};

export function SummaryCard({ summary }: { summary: any }) {
  return (
    <Card className="relative h-full hover:shadow-lg transition-shadow duration-200 group border border-gray-200">
      {/* Delete Button */}
      <div className="absolute top-3 right-3">
        <DeleteButton />
      </div>

      {/* Summary Content */}
      <Link href={`/dashboard/summary/${summary.id}`} className="block p-6 sm:p-8">
        <div className="flex flex-col gap-3 sm:gap-4">
          <SummaryHeader
            fileUrl={summary.file_url}
            title={summary.title}
            createdAt={summary.created_at}
          />

          <p className="text-sm xl:text-base text-gray-600 line-clamp-3">
            {summary.summary_text || "No summary available."}
          </p>

          <div className="flex items-center justify-between mt-3">
            <StatusBadge status={summary.status} />
            <span className="text-xs text-purple-500 font-medium">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </Card>
  );
}