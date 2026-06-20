import { campusCenter, mapScenes, getAllPoints, getSceneByTripId, type MapScene } from '../../mock/map'
import { type TripItem } from '../../mock/bus'

type MapContextLike = WechatMiniprogram.MapContext | null

function buildMarkers(scenes: MapScene[], selectedId: string) {
  const campusMarker = {
    id: 9000,
    latitude: campusCenter.latitude,
    longitude: campusCenter.longitude,
    iconPath: '/assets/map-stop-pin.png',
    width: 34,
    height: 34,
    anchor: { x: 0.5, y: 1 },
    callout: {
      content: '湘潭大学\n校园中心',
      color: '#35506b',
      fontSize: 11,
      borderRadius: 12,
      borderWidth: 0,
      bgColor: '#ffffff',
      padding: 6,
      display: 'ALWAYS' as const,
      textAlign: 'center' as const,
    },
  }

  return [campusMarker, ...scenes.flatMap((scene) => {
    const busMarker = {
      id: Number(scene.id.replace(/\D/g, '')) || scene.id,
      latitude: scene.busLatitude,
      longitude: scene.busLongitude,
      iconPath: scene.id === selectedId ? '/assets/map-bus-marker-green.png' : '/assets/map-bus-marker-blue.png',
      width: 48,
      height: 48,
      rotate: scene.heading,
      anchor: { x: 0.5, y: 0.5 },
      callout: {
        content: scene.busLabel,
        color: '#173313',
        fontSize: 12,
        borderRadius: 14,
        borderWidth: 0,
        bgColor: scene.id === selectedId ? '#e9ffe1' : '#edf5ff',
        padding: 6,
        display: 'ALWAYS' as const,
        textAlign: 'center' as const,
      },
    }

    const stopMarkers = scene.routeStops.map((stop, index) => ({
      id: `${scene.id}-stop-${index}`,
      latitude: stop.latitude,
      longitude: stop.longitude,
      iconPath: '/assets/map-stop-pin.png',
      width: 30,
      height: 30,
      anchor: { x: 0.5, y: 1 },
      callout: scene.id === selectedId ? {
        content: `${stop.name}\n${stop.time}`,
        color: '#35506b',
        fontSize: 11,
        borderRadius: 12,
        borderWidth: 0,
        bgColor: '#ffffff',
        padding: 5,
        display: index === 0 || index === scene.routeStops.length - 1 ? 'ALWAYS' as const : 'BYCLICK' as const,
        textAlign: 'center' as const,
      } : undefined,
    }))

    return [busMarker, ...stopMarkers]
  })]
}

function buildPolylines(scenes: MapScene[], selectedId: string) {
  return scenes.map((scene) => ({
    points: scene.routePoints,
    color: scene.color + (scene.id === selectedId ? 'E6' : '66'),
    width: scene.id === selectedId ? 10 : 7,
    dottedLine: scene.id !== selectedId,
    arrowLine: true,
    borderColor: scene.id === selectedId ? '#ffffff' : 'transparent',
    borderWidth: scene.id === selectedId ? 2 : 0,
  }))
}

Page({
  data: {
    topInset: 24,
    campusName: '湘潭大学',
    mapScenes,
    selectedSceneId: mapScenes[0].id,
    selectedScene: mapScenes[0],
    selectedBusName: mapScenes[0].busName,
    routeStopsView: mapScenes[0].routeStops.map(stop => ({
      ...stop,
      kindLabel: stop.kind === 'start' ? '上车点' : stop.kind === 'end' ? '终点' : '途经站',
    })),
    mapLatitude: campusCenter.latitude,
    mapLongitude: campusCenter.longitude,
    mapScale: 14,
    markers: buildMarkers(mapScenes, mapScenes[0].id),
    polyline: buildPolylines(mapScenes, mapScenes[0].id),
    focusMode: 'selected',
  },
  mapContext: null as MapContextLike,
  onLoad() {
    const { statusBarHeight = 0 } = wx.getSystemInfoSync()
    this.setData({
      topInset: statusBarHeight + 24,
    })
  },
  onReady() {
    this.mapContext = wx.createMapContext('bus-map', this)
  },
  onShow() {
    const cachedTrip = wx.getStorageSync('selectedTrip') as TripItem | undefined
    const selectedScene = cachedTrip ? getSceneByTripId(cachedTrip.id) : mapScenes[0]
    this.applyScene(selectedScene.id, false)
    if (cachedTrip) {
      wx.removeStorageSync('selectedTrip')
    }
  },
  applyScene(sceneId: string, centerOnBus: boolean) {
    const selectedScene = mapScenes.find(scene => scene.id === sceneId) || mapScenes[0]
    this.setData({
      selectedSceneId: selectedScene.id,
      selectedScene,
      selectedBusName: selectedScene.busName,
      routeStopsView: selectedScene.routeStops.map(stop => ({
        ...stop,
        kindLabel: stop.kind === 'start' ? '上车点' : stop.kind === 'end' ? '终点' : '途经站',
      })),
      mapLatitude: centerOnBus ? selectedScene.busLatitude : campusCenter.latitude,
      mapLongitude: centerOnBus ? selectedScene.busLongitude : campusCenter.longitude,
      mapScale: centerOnBus ? 16 : 14,
      markers: buildMarkers(mapScenes, selectedScene.id),
      polyline: buildPolylines(mapScenes, selectedScene.id),
      focusMode: centerOnBus ? 'selected' : 'all',
    })
  },
  onRouteTap(e: any) {
    const sceneId = e.currentTarget.dataset.sceneId as string | undefined
    if (!sceneId) {
      return
    }
    this.applyScene(sceneId, true)
  },
  onFollowBus() {
    this.applyScene(this.data.selectedSceneId, true)
  },
  onShowAll() {
    const allPoints = getAllPoints()
    if (this.mapContext && allPoints.length > 0) {
      this.mapContext.includePoints({
        points: allPoints,
        padding: [60, 60, 300, 60],
      })
    }
    this.setData({
      focusMode: 'all',
      mapScale: 13,
      mapLatitude: campusCenter.latitude,
      mapLongitude: campusCenter.longitude,
    })
  },
  onBack() {
    wx.navigateBack()
  },
})
