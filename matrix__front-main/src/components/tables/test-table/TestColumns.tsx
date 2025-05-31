import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

import CopyLinkModal from '@/components/copy-link-modal/CopyLinkModal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Test, TestStatus } from '@/types/test';

type testColumnsProps = {
  deleteTest: (id: string) => void;
  userRole: string;
};

export const testColumns = ({
  deleteTest,
  userRole,
}: testColumnsProps): ColumnDef<Test>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',

    cell: ({ row }) => <div>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'duration',
    header: () => <div className="text-center">Duration (minutes)</div>,
    cell: ({ row }) => {
      const duration = row.getValue('duration') as {
        hours: number;
        minutes: number;
      };
      return (
        <div className="text-center">
          {duration.hours * 60 + duration.minutes}
        </div>
      );
    },
  },
  {
    accessorKey: 'schedule',
    header: () => <div className="text-center">Schedule</div>,
    cell: ({ row }) => {
      const schedule = row.getValue('schedule') as {
        from: Date;
        to: Date;
      };

      return (
        <div className="text-center">
          {schedule.from.toLocaleString()} - {schedule.to.toLocaleString()}
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => <div className="text-center">Created At </div>,
    cell: ({ row }) => {
      const createdAt = row.getValue('createdAt') as Date;

      return <div className="text-center">{createdAt.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: 'createdByName',
    header: () => <div className="text-center">Created By </div>,
    cell: ({ row }) => {
      const createdBy = row.getValue('createdByName') as string;

      return <div className="text-center">{createdBy}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const now = new Date();
      const schedule = row.getValue('schedule') as {
        from: Date;
        to: Date;
      };
      const status =
        schedule.to < now
          ? 'ended'
          : schedule.from > now
            ? 'upcoming'
            : 'ongoing';

      return (
        <Badge
          variant={status.toLowerCase() as TestStatus}
          className="w-[70px]"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const test = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <CopyLinkModal link={`${window.location.origin}/test/${test.id}`} />

            {userRole === 'teacher' && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => deleteTest(test.id)}>
                  Delete test
                </DropdownMenuItem>
              </>
            )}
            {userRole === 'student' && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to={`/test-result/${test.id}`}>View Result</Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
