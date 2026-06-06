import { ListFilter, Search } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/app/components/ui/input-group";

const FILTER_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const SORT_OPTIONS = [
  { label: "Type", value: "type" },
  { label: "Name", value: "name" },
];

export default function Options({
  searchFn,
  filterFn,
  sortFn,
  addFn,
}: {
  searchFn: () => void;
  filterFn: () => void;
  sortFn: () => void;
  addFn: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <InputGroup className="w-full min-w-48 max-w-xs">
        <InputGroupInput onChange={searchFn} placeholder="Search..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button size="icon" variant="outline">
              <ListFilter />
            </Button>
          }
        />
        <DropdownMenuContent className="min-w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Sort</DropdownMenuLabel>
            <DropdownMenuRadioGroup defaultValue="name" onValueChange={sortFn}>
              {SORT_OPTIONS.map((option) => (
                <DropdownMenuRadioItem key={option.value} value={option.value}>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Filter</DropdownMenuLabel>
            <DropdownMenuRadioGroup defaultValue="all" onValueChange={filterFn}>
              {FILTER_OPTIONS.map((option) => (
                <DropdownMenuRadioItem key={option.value} value={option.value}>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button onClick={addFn} variant="outline">
        Add New
      </Button>
    </div>
  );
}
