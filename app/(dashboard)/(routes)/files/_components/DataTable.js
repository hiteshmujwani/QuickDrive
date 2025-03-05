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
                <TableCell className="">{item.fileSize}</TableCell>
                <TableCell className="text-center">
                  <Ellipsis />
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
                      {item.fileName}
                    </a>
                    <div className="flex gap-1">
                      <div>{item.fileFormat}</div> / <div>{item.fileSize}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <Ellipsis />
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
