import { scheduleTrips, todayTrips, type TripItem } from './bus'

export interface MapStop {
  name: string
  latitude: number
  longitude: number
  time: string
  kind: 'start' | 'stop' | 'end'
}

export interface MapScene {
  id: string
  trip: TripItem
  color: string
  heading: number
  busLatitude: number
  busLongitude: number
  busName: string
  busLabel: string
  eta: string
  speed: string
  occupancy: string
  nextStop: string
  routeStatus: string
  routeStops: MapStop[]
  routePoints: Array<{ latitude: number; longitude: number }>
}

export const campusCenter = {
  latitude: 27.8898,
  longitude: 112.9285,
}

const baseScenes: MapScene[] = [
  {
    id: 'trip-1',
    trip: todayTrips[0],
    color: '#4fbf5b',
    heading: 104,
    busLatitude: 27.89145,
    busLongitude: 112.92285,
    busName: '17 号车',
    busLabel: '17 号车\n北门方向',
    eta: '07:31 到达',
    speed: '26 km/h',
    occupancy: '24 / 34',
    nextStop: '图书馆',
    routeStatus: '早高峰接驳中',
    routeStops: [
      { name: '北门', latitude: 27.88785, longitude: 112.91805, time: '07:20', kind: 'start' },
      { name: '图书馆', latitude: 27.8921, longitude: 112.9246, time: '07:27', kind: 'stop' },
      { name: '一教', latitude: 27.88872, longitude: 112.93042, time: '07:34', kind: 'stop' },
      { name: '南苑宿舍', latitude: 27.88495, longitude: 112.9286, time: '07:40', kind: 'stop' },
      { name: '南门', latitude: 27.88495, longitude: 112.92402, time: '07:48', kind: 'end' },
    ],
    routePoints: [
      { latitude: 27.88785, longitude: 112.91805 },
      { latitude: 27.89065, longitude: 112.9224 },
      { latitude: 27.8921, longitude: 112.9246 },
      { latitude: 27.8902, longitude: 112.92785 },
      { latitude: 27.88872, longitude: 112.93042 },
      { latitude: 27.8859, longitude: 112.92916 },
      { latitude: 27.88495, longitude: 112.92402 },
    ],
  },
  {
    id: 'trip-2',
    trip: todayTrips[1],
    color: '#f39c38',
    heading: 72,
    busLatitude: 27.89095,
    busLongitude: 112.92782,
    busName: '26 号车',
    busLabel: '26 号车\n东门方向',
    eta: '12:18 到达',
    speed: '20 km/h',
    occupancy: '11 / 28',
    nextStop: '行政楼',
    routeStatus: '午间环线运行中',
    routeStops: [
      { name: '图书馆', latitude: 27.8921, longitude: 112.9246, time: '12:10', kind: 'start' },
      { name: '行政楼', latitude: 27.89108, longitude: 112.92758, time: '12:15', kind: 'stop' },
      { name: '一教', latitude: 27.88872, longitude: 112.93042, time: '12:19', kind: 'stop' },
      { name: '东门', latitude: 27.89548, longitude: 112.93418, time: '12:33', kind: 'end' },
    ],
    routePoints: [
      { latitude: 27.8921, longitude: 112.9246 },
      { latitude: 27.89108, longitude: 112.92758 },
      { latitude: 27.88952, longitude: 112.9291 },
      { latitude: 27.88872, longitude: 112.93042 },
      { latitude: 27.89548, longitude: 112.93418 },
    ],
  },
  {
    id: 'trip-3',
    trip: todayTrips[2],
    color: '#6f61ff',
    heading: 138,
    busLatitude: 27.88472,
    busLongitude: 112.92635,
    busName: '32 号车',
    busLabel: '32 号车\n研究生院方向',
    eta: '17:46 到达',
    speed: '22 km/h',
    occupancy: '18 / 34',
    nextStop: '研究生院',
    routeStatus: '晚高峰返程中',
    routeStops: [
      { name: '南门', latitude: 27.88495, longitude: 112.92402, time: '17:40', kind: 'start' },
      { name: '南苑宿舍', latitude: 27.8838, longitude: 112.9286, time: '17:45', kind: 'stop' },
      { name: '图书馆', latitude: 27.8921, longitude: 112.9246, time: '17:52', kind: 'stop' },
      { name: '研究生院', latitude: 27.88278, longitude: 112.93082, time: '18:08', kind: 'end' },
    ],
    routePoints: [
      { latitude: 27.88495, longitude: 112.92402 },
      { latitude: 27.8838, longitude: 112.9286 },
      { latitude: 27.88995, longitude: 112.9268 },
      { latitude: 27.8921, longitude: 112.9246 },
      { latitude: 27.88278, longitude: 112.93082 },
    ],
  },
  {
    id: 'trip-5',
    trip: scheduleTrips[4],
    color: '#19b5fe',
    heading: 34,
    busLatitude: 27.88965,
    busLongitude: 112.9373,
    busName: '28 号车',
    busLabel: '28 号车\n图书馆方向',
    eta: '14:28 到达',
    speed: '24 km/h',
    occupancy: '20 / 30',
    nextStop: '中转站',
    routeStatus: '穿梭接驳运行中',
    routeStops: [
      { name: '南校区', latitude: 27.88965, longitude: 112.9373, time: '14:15', kind: 'start' },
      { name: '中转站', latitude: 27.89115, longitude: 112.93196, time: '14:21', kind: 'stop' },
      { name: '行政楼', latitude: 27.89108, longitude: 112.92758, time: '14:26', kind: 'stop' },
      { name: '图书馆', latitude: 27.8921, longitude: 112.9246, time: '14:38', kind: 'end' },
    ],
    routePoints: [
      { latitude: 27.88965, longitude: 112.9373 },
      { latitude: 27.89115, longitude: 112.93196 },
      { latitude: 27.89108, longitude: 112.92758 },
      { latitude: 27.8921, longitude: 112.9246 },
    ],
  },
  {
    id: 'trip-4',
    trip: scheduleTrips[3],
    color: '#ff7f50',
    heading: 318,
    busLatitude: 27.89195,
    busLongitude: 112.92715,
    busName: '18 号车',
    busLabel: '18 号车\n北门方向',
    eta: '08:13 到达',
    speed: '25 km/h',
    occupancy: '16 / 34',
    nextStop: '北门',
    routeStatus: '返程接驳运行中',
    routeStops: [
      { name: '研究生院', latitude: 27.88278, longitude: 112.93082, time: '08:05', kind: 'start' },
      { name: '图书馆', latitude: 27.8921, longitude: 112.9246, time: '08:15', kind: 'stop' },
      { name: '西门', latitude: 27.88905, longitude: 112.92005, time: '08:22', kind: 'stop' },
      { name: '北门', latitude: 27.88785, longitude: 112.91805, time: '08:30', kind: 'end' },
    ],
    routePoints: [
      { latitude: 27.88278, longitude: 112.93082 },
      { latitude: 27.88995, longitude: 112.9276 },
      { latitude: 27.8921, longitude: 112.9246 },
      { latitude: 27.88905, longitude: 112.92005 },
      { latitude: 27.88785, longitude: 112.91805 },
    ],
  },
  {
    id: 'trip-6',
    trip: scheduleTrips[5],
    color: '#9b5cf6',
    heading: 18,
    busLatitude: 27.89185,
    busLongitude: 112.9294,
    busName: '23 号车',
    busLabel: '23 号车\n南校区方向',
    eta: '16:28 到达',
    speed: '23 km/h',
    occupancy: '14 / 30',
    nextStop: '南校区',
    routeStatus: '穿梭接驳运行中',
    routeStops: [
      { name: '图书馆', latitude: 27.8921, longitude: 112.9246, time: '16:20', kind: 'start' },
      { name: '行政楼', latitude: 27.89108, longitude: 112.92758, time: '16:24', kind: 'stop' },
      { name: '中转站', latitude: 27.89115, longitude: 112.93196, time: '16:30', kind: 'stop' },
      { name: '南校区', latitude: 27.88965, longitude: 112.9373, time: '16:40', kind: 'end' },
    ],
    routePoints: [
      { latitude: 27.8921, longitude: 112.9246 },
      { latitude: 27.89108, longitude: 112.92758 },
      { latitude: 27.89115, longitude: 112.93196 },
      { latitude: 27.88965, longitude: 112.9373 },
    ],
  },
]

function timeToMinutes(time: string) {
  const [hourText, minuteText] = time.split(':')
  const hour = Number(hourText)
  const minute = Number(minuteText)
  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return 0
  }
  return hour * 60 + minute
}

const orderedScenes = [...baseScenes].sort((a, b) => timeToMinutes(a.trip.departTime) - timeToMinutes(b.trip.departTime))

export const mapScenes = orderedScenes

export function getSceneByTripId(tripId?: string) {
  if (!tripId) {
    return orderedScenes[0]
  }
  return orderedScenes.find(scene => scene.id === tripId) || orderedScenes[0]
}

export function getAllPoints() {
  return orderedScenes.flatMap(scene => scene.routePoints)
}
