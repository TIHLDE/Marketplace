import { getLatestOrders } from "@/app/db/paymentOrder";
import Link from "next/link";
import TableRow from "../../_components/table/Row";
import TableCell from "../../_components/table/Cell";
import Avatar from "@/app/components/header/Avatar";
import OrderStatus from "@/app/orders/products/_components/OrderStatus";
import TransactionUser from "./TransactionUser";


const LatestTransactions = async () => {
    const latestOrders = await getLatestOrders(5);

    return (
        <div className='p-4 border border-gray-300 rounded-md'>
            <div className='flex items-center justify-between pb-6'>
                <h1 className='text-lg font-semibold'>
                    Siste transaksjoner
                </h1>
                <Link
                    className='text-sm text-tihlde-600 hover:text-tihlde-700'
                    href='/admin/stats/products/transactions'
                >
                    Se alle transaksjoner
                </Link>
            </div>

            <table className='w-full text-left'>
                <thead>
                    <tr className='border-b border-b-gray-200 pb-2 text-gray-400'>
                        <td>
                            Bruker
                        </td>
                        <td>
                            Dato
                        </td>
                        <td>
                            Beløp
                        </td>
                        <td>
                            Status
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {latestOrders.map((order, index) => (
                        <TableRow
                            key={index}
                            border={index !== latestOrders.length - 1}
                        >
                            <TransactionUser user={order.user} />
                            <td className='text-sm text-gray-500'>
                                { order.createdAt.toLocaleString('nb-NO') }
                            </td>
                            <td className='text-sm text-gray-500'>
                                kr { order.total_price }
                            </td>
                            <td>
                                <OrderStatus status={order.status} />
                            </td>
                        </TableRow>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default LatestTransactions;