"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ellipsis } from "lucide-react";
import ActionPopup from "./ActionPopup";
import { ScrollArea } from "@/components/ui/scroll-area";

const DataTable = ({ files }) => {
  return files.length > 0 ? (
    <div className="border bg-white  rounded-lg">
      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">SN.</TableHead>
              <TableHead>File Name</TableHead>
              <TableHead>File Type</TableHead>
              <TableHead className="">File Size</TableHead>
              <TableHead className="">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <a href={item.fileUrl}>{item.fileName}</a>
                </TableCell>
                <TableCell>{item.fileFormat}</TableCell>
                <TableCell className="">
                  {(item.fileSize / 1000 / 1000).toFixed(2) + " MB"}
                </TableCell>
                <TableCell className="text-center">
                  <ActionPopup file={item}>
                    <Ellipsis />
                  </ActionPopup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="sm:hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">SN.</TableHead>
              <TableHead>File</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <a href={item.fileUrl} className="font-medium">
                      {item.fileName.length > 30
                        ? item.fileName.substring(0, 30) + "..."
                        : item.fileName}
                    </a>
                    <div className="flex gap-1">
                      <div>{item.fileFormat}</div> /{" "}
                      <div>
                        {(item.fileSize / 1000 / 1000).toFixed(2) + " MB"}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <ActionPopup file={item}>
                    <Ellipsis />
                  </ActionPopup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ) : (
    <div className="bg-white text-center">No Files Found !!</div>
  );
};

export default DataTable;
