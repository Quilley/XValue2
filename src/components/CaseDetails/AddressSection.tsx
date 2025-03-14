import React from 'react';
import { Grid } from '@mui/material';
import AddressDatagrid from './AddressDatagrid';
import CardMap from './CardMap';

interface CustomerRow {
  id: string;
  selected: boolean;
  name: string;
}

interface AddressSectionProps {
  customerRows: CustomerRow[];
}

const AddressSection: React.FC<AddressSectionProps> = ({ customerRows }) => {
  return (
    <Grid container spacing={3}>
      {/* Address Data Grid (70% width) */}
      <Grid item xs={12} md={9}>
        <AddressDatagrid customerRows={customerRows} />
      </Grid>
      
      {/* Map Card (30% width) */}
      <Grid item xs={12} md={3}>
        <CardMap />
      </Grid>
    </Grid>
  );
};

export default AddressSection;



import React, { useState, useEffect } from 'react';
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TextField, Box, Button } from '@mui/material';

interface AddressRow {
  id: string;
  customerId: string;
  customerName: string;
  address: string;
  pincode: string;
  isActive: boolean;
}

interface AddressDatagridProps {
  customerRows: { id: string; selected: boolean; name: string }[];
}

const AddressDatagrid: React.FC<AddressDatagridProps> = ({ customerRows }) => {
  const [addressRows, setAddressRows] = useState<AddressRow[]>([]);

  useEffect(() => {
    // Initialize "addressRows" based on the provided customerRows
    const newRows = customerRows.map(c => ({
      id: `addr-${c.id}`,
      customerId: c.id,
      customerName: c.name,
      address: '',
      pincode: '',
      isActive: c.selected,
    }));
    setAddressRows(newRows);
  }, [customerRows]);

  const handleAddressChange = (id: string, value: string) =>
    setAddressRows(prev =>
      prev.map(row => row.id === id ? { ...row, address: value } : row)
    );

  const handlePincodeChange = (id: string, value: string) => {
    if (!/^\d*$/.test(value) || value.length > 6) return;
    setAddressRows(prev =>
      prev.map(row => row.id === id ? { ...row, pincode: value } : row)
    );
  };

  return (
    <Paper sx={{ width: '70%', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#F9FAFB' }}>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell width="120px">Pincode</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addressRows.map(row => (
              <TableRow key={row.id} sx={{ backgroundColor: row.isActive ? 'white' : '#FEF2F2' }}>
                <TableCell>
                  <TextField
                    value={row.customerName}
                    variant="outlined"
                    size="small"
                    InputProps={{
                      readOnly: true,
                      style: { color: row.isActive ? 'inherit' : 'red' }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    multiline
                    rows={2}
                    value={row.address}
                    onChange={(e) => handleAddressChange(row.id, e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={row.pincode}
                    onChange={(e) => handlePincodeChange(row.id, e.target.value)}
                    placeholder="6 digits"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', borderTop: '1px solid #ddd' }}>
        <Button variant="outlined">Add Address</Button>
      </Box>
    </Paper>
  );
};

export default AddressDatagrid;

import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

interface CardMapProps {
  // You can pass address rows if needed for dynamic markers
  addressRows: { pincode: string; customerName: string }[];
}

const CardMap: React.FC<CardMapProps> = ({ addressRows }) => {
  // For now, we use a fixed bounding box and center.
  const centerLat = 19.0760;
  const centerLng = 72.8777;
  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=72.80,19.00,73.00,19.15&layer=mapnik&marker=${centerLat},${centerLng}`;

  return (
    <Paper sx={{ width: '30%', minHeight: '320px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, marginLeft: 1 }}>
          Address Locations
        </Typography>
      </Box>
      <iframe 
        src={embedUrl}
        style={{ border: '0', width: '100%', height: '100%' }}
        allowFullScreen
        loading="lazy"
        title="Address Map"
      />
    </Paper>
  );
};

export default CardMap;

// In your OverviewContent.tsx or parent component
import AddressDatagrid from './AddressDatagrid';

// Then render:
<Box sx={{ display: 'flex', gap: 3, marginTop: '1rem' }}>
  <AddressDatagrid customerRows={rows} />
  {/* You can add your mapcard component here for the remaining 30% width */}
</Box>

//// filepath: src/components/CaseDetails/AddressDatagrid.tsx
import React, { useState, useEffect } from 'react';
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TextField, Box, Button } from '@mui/material';
import { PlusCircle } from 'lucide-react';

interface AddressRow {
  id: string;
  customerId: string;
  customerName: string;
  address: string;
  pincode: string;
  isActive: boolean;
}

interface AddressDatagridProps {
  customerRows: { id: string; selected: boolean; name: string }[];
}

const AddressDatagrid: React.FC<AddressDatagridProps> = ({ customerRows }) => {
  const [addressRows, setAddressRows] = useState<AddressRow[]>([]);

  useEffect(() => {
    const newRows = customerRows.map(c => ({
      id: `addr-${c.id}`,
      customerId: c.id,
      customerName: c.name,
      address: '',
      pincode: '',
      isActive: c.selected,
    }));
    setAddressRows(newRows);
  }, [customerRows]);

  const handleAddressChange = (id: string, value: string) => {
    setAddressRows(prev =>
      prev.map(row => row.id === id ? { ...row, address: value } : row)
    );
  };

  const handlePincodeChange = (id: string, value: string) => {
    if (!/^\d*$/.test(value) || value.length > 6) return;
    setAddressRows(prev =>
      prev.map(row => row.id === id ? { ...row, pincode: value } : row)
    );
  };

  const addNewAddress = () => {
    const customersWithoutAddress = customerRows.filter(customer =>
      customer.selected && !addressRows.some(addr => addr.customerId === customer.id)
    );
    if (customersWithoutAddress.length > 0) {
      const customer = customersWithoutAddress[0];
      setAddressRows([...addressRows, {
        id: `addr-${Date.now()}-${customer.id}`,
        customerId: customer.id,
        customerName: customer.name,
        address: '',
        pincode: '',
        isActive: true,
      }]);
    }
  };

  return (
    <Paper sx={{ width: '70%', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#F9FAFB' }}>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell sx={{ width: '120px' }}>Pincode</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addressRows.map(row => (
              <TableRow key={row.id} sx={{ backgroundColor: row.isActive ? 'white' : '#FEF2F2' }}>
                <TableCell>
                  <TextField
                    value={row.customerName}
                    variant="outlined"
                    size="small"
                    InputProps={{
                      readOnly: true,
                      style: { color: row.isActive ? 'inherit' : 'red' }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    multiline
                    rows={2}
                    value={row.address}
                    onChange={(e) => handleAddressChange(row.id, e.target.value)}
                    placeholder="Enter full address"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={row.pincode}
                    onChange={(e) => handlePincodeChange(row.id, e.target.value)}
                    placeholder="6 digits"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', borderTop: '1px solid #ddd' }}>
        <Button
          variant="outlined"
          startIcon={<PlusCircle size={16} />}
          onClick={addNewAddress}
          sx={{ borderColor: '#2563EB', color: '#2563EB', '&:hover': { backgroundColor: '#EBF5FF', borderColor: '#2563EB' }, px: 3, py: 1 }}
        >
          Add Address
        </Button>
      </Box>
    </Paper>
  );
};

export default AddressDatagrid;

//// filepath: src/components/CaseDetails/CardMap.tsx
import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

interface CardMapProps {
  // Extend props if you want to pass dynamic markers later
}

const CardMap: React.FC<CardMapProps> = () => {
  // Using a fixed bounding box and center for now with an OpenStreetMap embed
  const centerLat = 19.0760;
  const centerLng = 72.8777;
  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=72.80,19.00,73.00,19.15&layer=mapnik&marker=${centerLat},${centerLng}`;

  return (
    <Paper sx={{ width: '30%', minHeight: '320px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, ml: 1 }}>
          Address Locations
        </Typography>
      </Box>
      <iframe 
        src={embedUrl}
        style={{ border: '0', width: '100%', height: '100%' }}
        allowFullScreen
        loading="lazy"
        title="Address Map"
      />
    </Paper>
  );
};

export default CardMap;

// In OverviewContent.tsx (or a parent page)
import AddressSection from './AddressSection';

// Example: Render AddressSection using the "rows" array from your customer details state.
<Box sx={{ display: 'flex', gap: 3, marginTop: '1rem' }}>
  <AddressSection customerRows={rows} />
</Box>