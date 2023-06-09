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
              <ColorMapEntry color="#3cccff" quantity="0.0" label="0.0-1.0" opacity="0.8"/>
              <ColorMapEntry color="#0d74ba" quantity="4.4" label="1.0-4.4" opacity="0.8"/>
              <ColorMapEntry color="#92d051" quantity="6.4" label="4.5-6.4" opacity="0.8"/>
              <ColorMapEntry color="#ffff00" quantity="9.0" label="6.5-9.0" opacity="0.8"/>
              <ColorMapEntry color="#fda102" quantity="30.0" label="9.1-30.0" opacity="0.8"/>
              <ColorMapEntry color="#fd3c3a" quantity="200" label=">30.1" opacity="0.8"/>
      		</ColorMap>
          </RasterSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>