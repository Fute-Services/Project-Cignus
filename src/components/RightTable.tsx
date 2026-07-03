import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

import { type FloorData } from '../data/FloorData';

interface RightTableProps {
  floors: FloorData[];
  hoveredFloor: FloorData | null;
  setHoveredFloor: React.Dispatch<React.SetStateAction<FloorData | null>>;
}

export default function RightTable({
  floors,
  hoveredFloor,
  setHoveredFloor,
}: RightTableProps) {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (hoveredFloor) {
      const index = floors.findIndex((f) => f.id === hoveredFloor.id);
      if (index !== -1) {
        const rowHeight = 36;
        const containerHeight = 280;
        const targetY = Math.max(0, index * rowHeight - containerHeight / 2 + rowHeight / 2);
        scrollViewRef.current?.scrollTo({ y: targetY, animated: true });
      }
    }
  }, [hoveredFloor, floors]);

  const handleRowPress = (row: FloorData) => {
    // If the floor is tapped again, navigate to unit plan
    if (hoveredFloor?.id === row.id) {
      router.push(`/unitplan/${row.id}` as any);
    } else {
      setHoveredFloor(row);
    }
  };

  const handleOverviewPress = () => {
    router.push('/overview');
  };

  return (
    <View style={styles.container}>
      {/* Main Glassmorphism Table Container */}
      <View style={styles.tableCard}>
        {/* Table Headers */}
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, styles.borderRight]}>Floor</Text>
          <Text style={styles.headerCell}>Carpet Area</Text>
        </View>

        {/* Scrollable Rows */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={true}
        >
          {floors.map((row) => {
            const isActive = hoveredFloor?.id === row.id;
            return (
              <TouchableOpacity
                key={row.id}
                activeOpacity={0.8}
                onPress={() => handleRowPress(row)}
                accessibilityRole="button"
                accessibilityLabel={`Floor ${row.floorname}, ${row.area1}${isActive ? ', tap again to view unit plan' : ''}`}
                accessibilityState={{ selected: isActive }}
                style={[styles.tableRow, isActive && styles.activeRow]}
              >
                <Text style={[styles.rowCell, styles.borderRight, isActive && styles.activeText]}>
                  {row.floorname}
                </Text>
                <Text style={[styles.rowCell, isActive && styles.activeText]}>
                  {row.area1}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Overview Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleOverviewPress}
        accessibilityRole="button"
        accessibilityLabel="Overview"
        style={styles.overviewBtn}
      >
        <Text style={styles.overviewBtnText}>Overview</Text>
        <View style={styles.arrowIconWrapper}>
          <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.5">
            <Path d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 8,
  },
  tableCard: {
    width: '100%',
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  scrollContainer: {
    maxHeight: 280,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#020617',
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    height: 40,
    alignItems: 'center',
  },
  headerCell: {
    flex: 1,
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  borderRight: {
    borderRightWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    height: 36,
    alignItems: 'center',
  },
  activeRow: {
    backgroundColor: 'rgba(245, 166, 35, 0.25)',
  },
  rowCell: {
    flex: 1,
    color: '#ffffff',
    fontSize: 11,
    textAlign: 'center',
  },
  activeText: {
    color: '#F5C369',
    fontWeight: '600',
  },
  overviewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFCF77',
    borderRadius: 30,
    paddingLeft: 24,
    paddingRight: 8,
    height: 48,
    width: '100%',
    shadowColor: '#FFCF77',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  overviewBtnText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: 0.5,
  },
  arrowIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
