'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 24,
    color: '#121212',
    marginBottom: 20,
    fontFamily: 'Helvetica',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    border: '1px solid #7D756B',
    borderRadius: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#B78E28',
    marginBottom: 10,
    fontFamily: 'Helvetica',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
    borderBottom: '1px solid #F3F4F6',
    paddingBottom: 5,
  },
  label: {
    width: 100,
    fontSize: 12,
    color: '#6B7280',
  },
  value: {
    flex: 1,
    fontSize: 12,
    color: '#111827',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '1px solid #7D756B',
    paddingBottom: 5,
    marginBottom: 5,
  },
  headerText: {
    fontSize: 10,
    color: '#7D756B',
    flex: 1,
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #E5D6C8',
    paddingVertical: 5,
  },
  cellText: {
    fontSize: 10,
    color: '#121212',
    flex: 1,
  },
});

interface ReportPDFProps {
  name: string;
  dob: string;
  tob: string;
  locName: string;
  planets: any[];
  dasha: any;
}

export const ReportPDF = ({ name, dob, tob, locName, planets, dasha }: ReportPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>{name}'s Premium AstroReport</Text>
      
      <View style={styles.section}>
        <Text style={styles.subtitle}>Birth Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Date of Birth:</Text>
          <Text style={styles.value}>{dob}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Time of Birth:</Text>
          <Text style={styles.value}>{tob}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>{locName}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Planetary Positions</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Planet</Text>
          <Text style={styles.headerText}>Longitude</Text>
          <Text style={styles.headerText}>Rashi</Text>
          <Text style={styles.headerText}>Nakshatra</Text>
        </View>
        {planets.map((p, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={styles.cellText}>{p.name}</Text>
            <Text style={styles.cellText}>{Math.floor(p.longitude % 30)}°</Text>
            <Text style={styles.cellText}>{p.rashi}</Text>
            <Text style={styles.cellText}>{p.nakshatra}</Text>
          </View>
        ))}
      </View>

      {dasha && (
        <View style={styles.section}>
          <Text style={styles.subtitle}>Current Vimshottari Dasha</Text>
          {dasha.mahadasha && (
            <View style={styles.row}>
              <Text style={styles.label}>Maha Dasha:</Text>
              <Text style={styles.value}>{dasha.mahadasha.planet} (Ends: {dasha.mahadasha.end})</Text>
            </View>
          )}
          {dasha.antardasha && (
            <View style={styles.row}>
              <Text style={styles.label}>Antar Dasha:</Text>
              <Text style={styles.value}>{dasha.antardasha.planet} (Ends: {dasha.antardasha.end})</Text>
            </View>
          )}
        </View>
      )}
    </Page>
  </Document>
);
