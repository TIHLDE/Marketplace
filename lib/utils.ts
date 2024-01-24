import Role from "@/app/enums/role";
import { OrderStatus } from "@/app/utils/enums";
import { $Enums } from "@prisma/client";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

const convertRole = (role: $Enums.user_role) => {
  if (role === Role.ADMIN) return "admin";
  if (role === Role.MEMBER) return "bruker";
  if (role === Role.SUPERADMIN) return "superadmin";
};

const convertTransactionStatus = (status: string) => {
  if (status === OrderStatus.INITIATE) return "Initiert";
  if (status === OrderStatus.RESERVED) return "Reservert";
  if (status === OrderStatus.CAPTURE) return "Fanget";
  if (status === OrderStatus.CANCEL) return "Avbrutt";
  if (status === OrderStatus.REFUND) return "Refundert";
  if (status === OrderStatus.SALE) return "Betalt";
  return 'Ukjent';
};

const paymentStatusValues = [
  {
    value: OrderStatus.INITIATE,
    label: "Initiert"
  },
  {
    value: OrderStatus.RESERVED,
    label: "Reservert"
  },
  {
    value: OrderStatus.CAPTURE,
    label: "Fanget"
  },
  {
    value: OrderStatus.CANCEL,
    label: "Avbrutt"
  },
  {
    value: OrderStatus.REFUND,
    label: "Refundert"
  },
  {
    value: OrderStatus.SALE,
    label: "Betalt"
  }
];


export {
  cn,
  convertRole,
  convertTransactionStatus,
  paymentStatusValues
}