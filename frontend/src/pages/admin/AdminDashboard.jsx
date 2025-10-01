import { Link } from 'react-router-dom';
import { FiPackage, FiShoppingBag, FiUsers, FiDollarSign } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { productsAPI, ordersAPI } from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        productsAPI.getAll(),
        ordersAPI.getAllOrders(),
      ]);

      const products = productsRes.data.data;
      const orders = ordersRes.data.data;

      const totalRevenue = orders.reduce((sum, order) => {
        if (order.status !== 'cancelled') {
          return sum + order.totalAmount;
        }
        return sum;
      }, 0);

      const pendingOrders = orders.filter(order => order.status === 'pending').length;

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue,
        pendingOrders,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: FiPackage,
      color: 'bg-blue-500',
      link: '/admin/products',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: FiShoppingBag,
      color: 'bg-green-500',
      link: '/admin/orders',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: FiDollarSign,
      color: 'bg-purple-500',
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: FiUsers,
      color: 'bg-yellow-500',
      link: '/admin/orders',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="card hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                <p className="text-3xl font-bold">{loading ? '...' : stat.value}</p>
              </div>
              <div className={`${stat.color} p-4 rounded-lg`}>
                <stat.icon className="text-white text-2xl" />
              </div>
            </div>
            {stat.link && (
              <Link to={stat.link} className="text-primary-600 text-sm mt-4 inline-block hover:underline">
                View Details →
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            to="/admin/products"
            className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all"
          >
            <FiPackage className="text-3xl text-primary-600 mb-2" />
            <h3 className="font-semibold text-lg mb-1">Manage Products</h3>
            <p className="text-gray-600 text-sm">Add, edit, or remove products</p>
          </Link>
          <Link
            to="/admin/orders"
            className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all"
          >
            <FiShoppingBag className="text-3xl text-primary-600 mb-2" />
            <h3 className="font-semibold text-lg mb-1">Manage Orders</h3>
            <p className="text-gray-600 text-sm">View and update order status</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;