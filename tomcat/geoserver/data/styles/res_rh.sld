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
              <ColorMapEntry color="#ffffcd" quantity="15" label="0-15" opacity="0.5"/>
              <ColorMapEntry color="#c7e9b4" quantity="30" label="16-30" opacity="0.5"/>
              <ColorMapEntry color="#7fcdbb" quantity="45" label="31-45" opacity="0.5"/>
              <ColorMapEntry color="#40b8c6" quantity="60" label="46-60" opacity="0.5"/>
              <ColorMapEntry color="#1692c1" quantity="75" label="61-75" opacity="0.5"/>
              <ColorMapEntry color="#1d5ea9" quantity="90" label="76-90" opacity="0.5"/>
              <ColorMapEntry color="#042886" quantity="100" label="90-100" opacity="0.5"/>
      		</ColorMap>
          </RasterSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>