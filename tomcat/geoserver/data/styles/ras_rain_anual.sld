<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/sld
http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd" version="1.0.0">
  <NamedLayer>
    <Name></Name>
    <UserStyle>
      <Title>A raster style</Title>
      <FeatureTypeStyle>
        <Rule>
          <RasterSymbolizer>
            <ColorMap type="intervals" extended="true">
              <ColorMapEntry color="#f6f2d8" quantity="50" label="0-50" opacity="0.7"/>
              <ColorMapEntry color="#e2efc7" quantity="100" label="51-100" opacity="0.7"/>
              <ColorMapEntry color="#c6e8bd" quantity="200" label="101-200" opacity="0.7"/>
              <ColorMapEntry color="#a5e0b7" quantity="400" label="201-400" opacity="0.7"/>
              <ColorMapEntry color="#7fd5b9" quantity="600" label="401-600" opacity="0.7"/>
              <ColorMapEntry color="#57c8bd" quantity="800" label="601-800" opacity="0.7"/>
              <ColorMapEntry color="#36b8c0" quantity="1000" label="801-1000" opacity="0.7"/>
              <ColorMapEntry color="#2da5c2" quantity="1200" label="1001-1200" opacity="0.7"/>
              <ColorMapEntry color="#478ec2" quantity="1400" label="1201-1400" opacity="0.7"/>
              <ColorMapEntry color="#6375b9" quantity="1600" label="1401-1600" opacity="0.7"/>
              <ColorMapEntry color="#7a55ab" quantity="1800" label="1601-1800" opacity="0.7"/>
              <ColorMapEntry color="#843590" quantity="2000" label="1801-2000" opacity="0.7"/>
              <ColorMapEntry color="#80136f" quantity="3000" label=">2000" opacity="0.7"/>
      		</ColorMap>
          </RasterSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>